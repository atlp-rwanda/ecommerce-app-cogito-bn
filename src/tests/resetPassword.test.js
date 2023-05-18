// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import {
//   describe, it, before, after,
// } from 'mocha';
// import crypto from 'crypto';
// import app from '../index';
// import { user } from '../database/models';

// const { expect } = chai;
// chai.should();
// chai.use(chaiHttp);
// after(async () => {
//   // delete the test user
//   await user.destroy({ where: { email: 'test@example.com' } });
// });
// describe('Password reset API', () => {
//   let resetToken = '';

//   before(async () => {
//     const testUser = await user.create({
//       name: 'test',
//       email: 'test@example.com',
//       password: 'password',
//       phone: '0000000000',
//       roleId: '2',
//       gender: 'male',
//       birthdate: '1/1/2000',
//       preferred_language: 'en',
//       preferred_currency: 'rwf',
//     });
//     // generate a reset token and save it to the user
//     resetToken = crypto.randomBytes(20).toString('hex');
//     const resetTokenExpiry = Date.now() + 3600000; // 1 hour
//     testUser.resetToken = resetToken;
//     testUser.resetTokenExpiry = resetTokenExpiry;
//     await testUser.save();
//   });

//   describe('POST /forgot', () => {
//     it('should return 404 if user does not exist', async () => {
//       const res = await chai
//         .request(app)
//         .post('/auth/forgot')
//         .send({ email: 'nonexistinguser@example.com' });
//       expect(res.status).to.equal(404);
//       expect(res.body.message).to.equal('User not found message');
//     });

//     it('should generate a reset token and send an email', async () => {
//       const res = await chai.request(app).post('/auth/forgot').send({ email: 'test@example.com' });

//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('Password reset email message');
//       resetToken = res.body.token;
//     });
//   });

//   describe('POST /reset/:resetToken', () => {
//     it('should return 400 if provided is invalid or expired', async () => {
//       const res = await chai
//         .request(app)
//         .post('/auth/reset/4567')
//         .send({ newPassword: 'newpassword' });
//       expect(res).to.have.status(400);
//       expect(res.body.message).to.equal('Invalid token message');
//     });

//     it('should return 400 if new password is not provided', async () => {
//       const res = await chai.request(app).post(`/auth/reset/${resetToken}`).send({});
//       expect(res).to.have.status(400);
//       expect(res.body.message).to.equal('New Password Not Provided message');
//     });

//     it("should reset the user's password and clear the reset token", async () => {
//       const newPassword = 'newpassword';
//       const res = await chai.request(app).post(`/auth/reset/${resetToken}`).send({ newPassword });
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('Password reset successfully message');
//       // check that the user's password was updated and reset token was cleared in the database
//       const testUser = await user.findOne({ where: { email: 'test@example.com' } });
//       expect(testUser.password).to.not.equal('password');
//       expect(testUser.resetToken).to.equal(null);
//       expect(testUser.resetTokenExpiry).to.equal(null);
//     });
//   });
// });
