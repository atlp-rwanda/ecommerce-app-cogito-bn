import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import dotenv from 'dotenv';
import app from '../index';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);
dotenv.config({ path: '.env' });
let token;
before(async () => {
  // Log in the user and get the token
  const loginRes = await chai.request(app).post('/login').send({
    email: 'kundaaggy@example.com',
    password: 'kunda123',
  });
  token = loginRes.body.token;
  console.log('Token First:  ', token);
});
describe('POST /auth/signup', () => {
  it('should create a new user account', async () => {
    const res = await chai.request(app).post('/register').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password',
    });
  });
});
describe('POST /auth/login', () => {
  it('should log in an existing user', async () => {
    const res = await chai.request(app).post('/login').send({
      email: 'johndoe@example.com',
      password: 'password',
    });
    token = res.body.token;
  });
});
describe('POST /auth/logout', () => {
  it('should log out an existing user', async () => {
    const res = await chai
      .request(app)
      .post('/logout')
      .set({ Authorization: `Bearer ${token}` });
    expect(res).to.have.status(500);
  });
});
