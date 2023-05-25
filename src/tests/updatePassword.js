import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it, before, after,
} from 'mocha';
import { user } from '../database/models';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Password Update API', () => {
  let testUserId;
  before(async () => {
    const testUser = await user.create({
      email: 'test@gmail.com',
      password: 'oldPassword@123',
      name: 'Kunda',
      gender: 'Female',
      phone: '0786992299',
      birthdate: '2021:08:11',
      preferred_language: 'en',
      preferred_currency: '$',
    });
    testUserId = testUser.id;
  });

  after(async () => {
    // Run any cleanup tasks, such as deleting the test user
    await user.destroy({
      where: {
        id: testUserId,
      },
    });
  });

  describe('PUT /update-password/:id', () => {
    it('should return 401 if required fields are missing', (done) => {
      chai
        .request(app)
        .put(`/updatepassword/${testUserId}`)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal(
            'Please fill in the old password, new password and confirm password',
          );
          done();
        });
    });

    it('should return 401 if user does not exist', (done) => {
      chai
        .request(app)
        .put('/updatepassword/1000')
        .send({
          old_password: 'oldPassword@123',
          new_password: 'newPassword',
          confirm_password: 'newPassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('should return 401 if old password does not match', (done) => {
      chai
        .request(app)
        .put(`/updatepassword/${testUserId}`)
        .send({
          old_password: 'incorrectOldPassword@123',
          new_password: 'newPassword',
          confirm_password: 'newPassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Your old password is not correct');
          done();
        });
    });

    it('should return 401 if new password does not meet the requirements', (done) => {
      chai
        .request(app)
        .put(`/updatepassword/${testUserId}`)
        .send({
          old_password: 'oldPassword@123',
          new_password: 'weakpassword',
          confirm_password: 'weakpassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal(
            'Your password must contain at least 1 uppercase, 1 lowercase, 1 digit, and one case character',
          );
          done();
        });
    });

    it('should return 500 if new password and confirm password do not match', (done) => {
      chai
        .request(app)
        .put(`/updatepassword/${testUserId}`)
        .send({
          old_password: 'oldPassword@123',
          new_password: 'newPassword@123',
          confirm_password: 'differentPassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equal('your new password does not match');
          done();
        });
    });

    it('should update the password if all conditions are met', (done) => {
      chai
        .request(app)
        .put(`/updatepassword/${testUserId}`)
        .send({
          old_password: 'oldPassword@123',
          new_password: 'newPassword@123',
          confirm_password: 'newPassword@123',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('your password was updated sucessfully');
          done();
        });
    });
  });
});
