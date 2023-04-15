import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../index';

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);
dotenv.config({ path: '.env' });

describe('API tests', () => {
  describe('Test API default route', () => {
    it('It should return a welcome string', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          const actualValue = res.body.message;
          expect(actualValue).to.be.equal("Welcome to Cogito's Ecommerce app API");
          done();
        });
    });
  });

  describe('Vendors two factor authention', () => {
    it('It should create a user, log them in, send TOTP to their email, and delete the user', (done) => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'umubyeyievelyne8917@gmail.com@gmail.com',
        password: '123',
        phone: '0789876523',
        role: 'vendor',
      };

      chai
        .request(app)
        .post('/register')
        .send(user)
        .end(async (err, res) => {
          res.should.have.status(201);
          const response = await chai
            .request(app)
            .post('/login')
            .send({ email: user.email, password: user.password });
          response.should.have.status(200);
          const token = response.header.authenticate;
          const sendOTPres = await chai
            .request(app)
            .post('/sendOtp')
            .set({ Authorization: `Bearer ${token}` });
          sendOTPres.should.have.status(200);
          const deleteUserRes = await chai
            .request(app)
            .delete('deleteUser')
            .send({ email: user.email });
          deleteUserRes.should.have.status(200);
          done();
        });
    });
  });
});
