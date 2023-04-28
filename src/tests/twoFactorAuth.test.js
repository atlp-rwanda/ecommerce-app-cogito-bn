import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import speakeasy from 'speakeasy';
import Bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import app from '../index';

const { expect } = chai;
chai.should();
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

  describe('GET /OTP/sendOtp', () => {
    it('It should create a user, log them in, send TOTP to their email, and delete the user', async () => {
      const user = {
        name: 'John',
        email: 'test182390@gmail.com',
        gender: 'Female',
        birthdate: '2023-04-07',
        preferredLanguage: 'en',
        preferredCurrency: 'RF',
        billingAddress: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
        password: '123',
        roleId: 2,
      };

      const res = await chai.request(app).post('/OTP/register').send(user);
      res.should.have.status(201);

      const response = await chai
        .request(app)
        .post('/OTP/login')
        .send({ email: user.email, password: user.password });
      response.should.have.status(200);
      const { token } = response.body;

      const sendOTPres = await chai
        .request(app)
        .get('/OTP/sendOtp')
        .set({ Authorization: `Bearer ${token}` });
      sendOTPres.should.have.status(200);

      const deleteUserRes = await chai
        .request(app)
        .delete('/OTP/deleteUser')
        .send({ email: user.email });
      deleteUserRes.should.have.status(200);
    });
  });

  describe('POST /OTP/verify', () => {
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
