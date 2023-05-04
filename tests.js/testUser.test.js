/* eslint-disable indent */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../src/index';

const { expect } = chai;

chai.use(chaiHttp);

// login
describe('Login', () => {
    it('should be able to login', (done) => {
        chai.request(app)
            .post('/OTP/login')
            .send({ email: 'leo@example.com', password: 'kunda123' })
            .end((err, res) => {
                if (err) return done(err);

                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('token');
                done();
            });
    });
});
