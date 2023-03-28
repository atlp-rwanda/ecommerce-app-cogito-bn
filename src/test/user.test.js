import chai from "chai";
import {expect} from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import User from "../models/user"

chai.expect();
chai.use(chaiHttp);
jest.setTimeout(50000);
chai.should();

describe("Testing User Routes", ()  =>{
    let adminUser;
    let adminToken;
    let regularUser;
    let regularToken;
    let  userId;
    beforeAll(async () => {
        adminUser = new User({
          email: 'admin@gmail.com',
          password: 'admin',
          role: 'Admin',
        });
        await adminUser.save();
        adminToken = adminUser.generateToken();
    
        regularUser = new User({
         firstName: "AB",
         lastName: "AB",
         email: "ab@gmail.com",
         password: "ABC",
         role: 'User',
        });
        await regularUser.save();
        regularToken = regularUser.generateToken();
    });
    
    afterAll(async () => {
        await User.deleteMany({});
    });

   

    it("should login user.", async () =>{
        const res = await chai.request(app).post("/login").send({
            email: "ab@gmail.com",
            password: "ABC"
        });
        expect(res.status).to.be.equal(200);
    }); 

    describe('GET /users', () => {
        it('should allow admin user to retrieve all users', async () => {
            const res = await chai
                .request(app)
                .get('/users')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2); // Admin user and regular user
        });

        it('should not allow regular user to retrieve all users', async () => {
            const res = await chai
                .request(app)
                .get('/users')
                .set('Authorization', `Bearer ${regularToken}`);
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Unauthorized');
        });
    });

    it('should allow admin user to delete a user', async () => {
        User._id.toString();
        const res = await chai
            .request(app)
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res).to.have.status(204);

        // check if the user is actually deleted
        const deletedUser = await User.findById(userId);
        expect(deletedUser).to.be.null;
    });

    it('should update user', async () => {
        const res = await chai
          .request(app)
          .put(`/users/${User._id}`)
          .send({
            firstName: 'New',
            lastName: 'Name',
            email: 'new@example.com'
          });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.firstName).to.equal('New');
        expect(res.body.lastName).to.equal('Name');
        expect(res.body.email).to.equal('new@example.com');
      });
    
});
