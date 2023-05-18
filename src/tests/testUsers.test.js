// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { describe, it } from 'mocha';
// import dotenv from 'dotenv';
// import app from '../index';
// import { User } from '../database/models';

// const { expect } = chai;
// chai.should();
// chai.use(chaiHttp);
// dotenv.config({ path: '.env' });
// let token;

// describe('POST /auth/signup', () => {
//   it('should create a new user account', async () => {
//     const res = await chai.request(app).post('/register').send({
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'johndoe@example.com',
//       password: 'password',
//     });
//   });
// });
// describe('POST /auth/login', () => {
//   it('should log in an existing user', async () => {
//     const res = await chai.request(app).post('/login').send({
//       email: 'johndoe@example.com',
//       password: 'password',
//     });
//     token = res.body.token;
//   });
// });
// describe('POST /auth/logout', () => {
//   it('should log out an existing user', async () => {
//     const res = await chai
//       .request(app)
//       .post('/logout')
//       .set({ Authorization: `Bearer ${token}` })
//       .send({
//         email: 'johndoe@example.com',
//         password: 'password',
//       });
//     expect(res).to.have.status(200);
//   });
// });
