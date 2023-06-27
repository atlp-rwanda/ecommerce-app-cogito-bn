import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from '../controllers/Auth/googleAuth';
import appRouter from '../routes/user/googleAuthRoutes';

dotenv.config({ path: '.env' });
const app = express();
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', appRouter); // Replace '../../routes' with the path to your routes file

chai.use(chaiHttp);
const { expect } = chai;

describe('Routes', () => {
  describe('GET /auth/google', () => {
    it('should return status 200', (done) => {
      chai
        .request(`${process.env.BN_BASE_URL}`)
        .get('/auth/google')
        .end(() => {
          done();
        });
    });
  });

  describe('GET /auth/google/callback', () => {
    it('should return status 200 and a response with token and user', (done) => {
      chai
        .request(`${process.env.BN_BASE_URL}`)
        .get('/auth/google/callback')
        .end(() => {
          done();
        });
    });
  });
});
