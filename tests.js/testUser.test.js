/* eslint-disable indent */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

// login
describe('Login', () => {
    it('should be able to login', (done) => {
        chai.request(app)
            .post('/api/auth/sign_in')
            .send({ email: 'admin@gmail.com', password: 'Passcode@1' })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).to.equal(200);

                expect(res.body).to.have.property('status').eql('success');
                expect(res.body).to.have.property('successMessage');
                expect(res.body).to.have.property('token');

                done();
            });
    });
});
