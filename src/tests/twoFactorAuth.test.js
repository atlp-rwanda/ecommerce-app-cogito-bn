import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import speakeasy from 'speakeasy';
import Bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import app from '../index';

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);
dotenv.config({ path: '.env' });

describe('API tests', () => {
  describe('Test API default route', () => {
    it('It should return a welcome string', async () => {
      const res = await chai.request(app).get('/');

      res.should.have.status(200);
      res.body.should.be.a('object');
      const actualValue = res.body.message;
      expect(actualValue).to.be.equal("Welcome to Cogito's Ecommerce app API");
    });
  });

  describe('GET /users/sendOtp', () => {
    it('It should create a user, log them in, send TOTP to their email, and delete the user', async () => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'e.umubyeyi@alustudent.com',
        password: '123',
        phone: '0789876523',
        role: 'vendor',
      };

      const res = await chai.request(app).post('/users/register').send(user);
      res.should.have.status(201);

      const response = await chai
        .request(app)
        .post('/users/login')
        .send({ email: user.email, password: user.password });
      response.should.have.status(200);
      const { token } = response.body;

      const sendOTPres = await chai
        .request(app)
        .get('/users/sendOtp')
        .set({ Authorization: `Bearer ${token}` });
      sendOTPres.should.have.status(200);

      const deleteUserRes = await chai
        .request(app)
        .delete('/users/deleteUser')
        .send({ email: user.email });
      deleteUserRes.should.have.status(200);
    });
  });

  describe('POST /users/verify', () => {
    it('It should create an OTP, and validate it', async () => {
      // Generate a secret key for the user
      const { base32: secret } = speakeasy.generateSecret({ length: 20 });

      // Generate an OTP for the user
      const speakeasyToken = speakeasy.totp({
        secret,
        encoding: 'base32',
        time: Math.floor(Date.now() / 1000 / 90),
        step: 90,
      });
      const salt = await Bcrypt.genSalt(10);
      const hashedOTP = await Bcrypt.hash(speakeasyToken, salt);
      const encodedOTP = Buffer.from(hashedOTP).toString('base64');

      const decodedOTP = Buffer.from(encodedOTP, 'base64').toString('utf-8');
      const isMatch = await Bcrypt.compare(speakeasyToken, decodedOTP);
      isMatch.should.be.equal(true);
    });

    it('It should not validate a wrogn otp', async () => {
      // Generate a secret key for the user
      const { base32: secret } = speakeasy.generateSecret({ length: 20 });

      // Generate an OTP for the user
      const speakeasyToken = speakeasy.totp({
        secret,
        encoding: 'base32',
        time: Math.floor(Date.now() / 1000 / 90),
        step: 90,
      });
      const salt = await Bcrypt.genSalt(10);
      const hashedOTP = await Bcrypt.hash(speakeasyToken, salt);
      const encodedOTP = Buffer.from(hashedOTP).toString('base64');

      const decodedOTP = Buffer.from(encodedOTP, 'base64').toString('utf-8');
      const isMatch = await Bcrypt.compare('111111', decodedOTP);
      isMatch.should.be.equal(false);
    });
  });
});
