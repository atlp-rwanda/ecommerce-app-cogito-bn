import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it, before, after,
} from 'mocha';
import { user, notification } from '../database/models';
import app from '../index';
import { hashPassword } from '../utils/validation/hashedPassword';

chai.use(chaiHttp);
const { expect } = chai;
const oldPassword = hashPassword('oldPassword@123');
describe('Notification Tests', () => {
  let testUserId;
  let testUserId2;
  before(async () => {
    const testUser = await user.create({
      email: 'test@gmail.com',
      password: oldPassword,
      name: 'Test User',
      gender: 'Female',
      phone: '0786992299',
      birthdate: '2021:08:11',
      preferred_language: 'en',
      preferred_currency: '$',
    });
    const testUser2 = await user.create({
      email: 'test2@gmail.com',
      password: oldPassword,
      name: 'Test User2',
      gender: 'Male',
      phone: '0787685733',
      birthdate: '2002:08:11',
      preferred_language: 'en',
      preferred_currency: '$',
    });
    testUserId = testUser.id;
    testUserId2 = testUser2.id;
  });

  after(async () => {
    // Run any cleanup tasks, such as deleting the test user
    await user.destroy({
      where: {
        id: testUserId,
      },
    });
    await user.destroy({
      where: {
        id: testUserId2,
      },
    });
    await notification.destroy({
      where: {
        userId: testUserId,
      },
    });
    // await notification.destroy({
    //   where: {
    //     userId: testUserId2,
    //   },
    // });
  });

  describe('Notification Tests', () => {
    it('should return status 404 if no notification available', (done) => {
      chai
        .request(app)
        .get(`/notification/${testUserId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Notification were retrieved successfully');
          done();
        });
    });
    it('should allow password update', (done) => {
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
    it('should generate a notification upon a successful password update', (done) => {
      chai
        .request(app)
        .get(`/notification/${testUserId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Notification were retrieved successfully');
          done();
        });
    });
    it('should handle error and return status 500 for unexpected errors', (done) => {
      // passed a wrong ID to test if the endpoint hanldes the error perfectly
      const wrongID = '12Q';
      chai
        .request(app)
        .get(`/notification/${wrongID}`)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error).to.equal('Error in retrieving notification');
          done();
        });
    });
    it('should mark all notification of the current user as read and return a 200 status when notifications available', (done) => {
      chai
        .request(app)
        .get(`/notification/markAllAsRead/${testUserId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Updated All Notification Status Successfully!!');
          done();
        });
    });
    it('should return a 404 status when the current user doesnt have any notifications available', async () => {
      const userIdTrial = await notification.destroy({
        where: { userId: 1000 },
      });
      if (!userIdTrial) {
        chai
          .request(app)
          .get(`/notification/markAllAsRead/${1000}`)
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.error).to.equal('No notification found with the provided User ID');
          });
      }
    });
    it('should handle error and return status 500 for unexpected errors on marl all as read endpoint', (done) => {
      // passed a wrong ID to test if the endpoint hanldes the error perfectly
      const wrongID = '12Q';
      chai
        .request(app)
        .get(`/notification/markAllAsRead/${wrongID}`)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error).to.equal('Failed to Mark All Notification As Read');
          done();
        });
    });
    it('should return a status of 500 on a prompt to mark read an already notification', async () => {
      const singleNotificationID = await notification.findAll({
        where: { userId: testUserId },
        attributes: ['id'],
        raw: true,
      });
      const noticeMarked = singleNotificationID;
      chai
        .request(app)
        .get(`/notification/markAsRead/${noticeMarked}`)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error).to.equal('Failed to Mark Notification As Read');
        });
    });
    it('should return a 404 status when the current user doesnt have any notifications available', async () => {
      const userIdTrial = await notification.destroy({
        where: { userId: 1000 },
      });
      if (!userIdTrial) {
        chai
          .request(app)
          .get(`/notification/markAsRead/${1000}`)
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.error).to.equal('No notification found with the provided ID');
          });
      }
    });
    it('should allow password update on the second user', (done) => {
      chai
        .request(app)
        .put(`/updatepassword/${testUserId2}`)
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
    it('should return a status of 200 after successfully marking a notification as read', async () => {
      const singleNotificationID = await notification.findAll({
        where: { userId: testUserId2, isRead: false },
        attributes: ['id'],
        raw: true,
      });
      const noticeMarked = singleNotificationID[0].id;
      console.log('@@@@@@@@@@@::::::::::', noticeMarked);
      chai
        .request(app)
        .get(`/notification/markAsRead/${noticeMarked}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Updated Notification Status Successfully!!');
        });
    });
    it('should return a status of 200 after successfully deleting a single notification', async () => {
      const singleNotificationID = await notification.findAll({
        where: { userId: testUserId2 },
        attributes: ['id'],
        raw: true,
      });
      const noticeMarked = singleNotificationID[0].id;
      console.log('@@@@@@@@@@@::::::::::', noticeMarked);
      chai
        .request(app)
        .get(`/notification/deleteNotification/${noticeMarked}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Notification deleted successfully');
        });
    });
  });
});
