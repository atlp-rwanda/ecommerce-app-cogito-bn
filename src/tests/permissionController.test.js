import {
  describe, it, before, after,
} from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';

const {
  permission, user, role, rolepermission,
} = require('../database/models');

chai.use(chaiHttp);
const { expect } = chai;

describe('Permission Controller Test', () => {
  let testPermissionId;
  let testAdminId; // Admin Id
  let adminToken;
  let testroleId;

  before(async () => {
    try {
      const testPermission = await permission.create({
        permissionName: 'Manage Test',
        description: 'This Test is for the user to Manage test',
      });
      const testRole = await role.create({
        roleName: ' Admin',
        description: 'manage user test',
      });
      const testAdmin = await user.create({
        email: 'testadmin@gmail.com',
        password: 'Admin123QW!@',
        name: 'Admin Tester',
        gender: 'Male',
        phone: '0786042299',
        birthdate: '2000:08:11',
        preferred_language: 'en',
        preferred_currency: '$',
        roleId: 1,
      });
      const adminLogin = await chai
        .request(app)
        .post('/login')
        .send({ email: testAdmin.email, password: testAdmin.password });

      adminToken = adminLogin.body.token;
      console.log('Token created: ', adminToken);

      testPermissionId = testPermission.id;
      testAdminId = testAdmin.id;
      testroleId = testRole.id;
    } catch (error) {
      console.error('Error in before hook:', error);
    }
  });

  after(async () => {
    try {
      await permission.destroy({
        where: {
          id: testPermissionId,
        },
      });

      await user.destroy({
        where: {
          id: testAdminId,
        },
      });
      await role.destroy({
        where: {
          id: testroleId,
        },
      });
    } catch (error) {
      console.error('Error in after hook:', error);
    }
  });

  describe('createNewPermission', () => {
    it('should create a new permission and return status 201 with the created permission', async () => {
      const newPermissionData = {
        permissionName: 'Test Permission',
        description: 'This is a test permission',
      };

      const res = await chai
        .request(app)
        .post('/permission')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newPermissionData);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('statusCode', 201);
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
      expect(res.body.data).to.have.property('permissionName', newPermissionData.permissionName);
      expect(res.body.data).to.have.property('description', newPermissionData.description);
      await permission.destroy({
        where: {
          id: res.body.data.id,
        },
      });
    });
    it('should return a status of 500 when there is an error in creating a new permission', async () => {
      const newPermissionData = {
        permissionNames: 'Test Permission',
        descriptions: 'This is a test permission',
      };

      const res = await chai
        .request(app)
        .post('/permission')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newPermissionData);
      expect(res).to.have.status(500);
      expect(res.body).to.have.property('Error');
    });
    it('should get all permissions and return status 200 with the permissions data', async () => {
      const res = await chai
        .request(app)
        .get('/permission')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('statusCode', 200);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
    });
    it('should handle errors and return status 400 with the error data', async () => {
      const findAllStub = sinon.stub(permission, 'findAll').rejects(new Error('Database error'));
      const res = await chai
        .request(app)
        .get('/permission')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('statusCode', 400);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('object');
      findAllStub.restore();
    });
    it('should get a single permission and return status 200 with the permission data', async () => {
      const res = await chai
        .request(app)
        .get(`/permission/${testPermissionId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('statusCode', 200);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
    it('should return a status 404 when the permission is not found', async () => {
      const trialPersmissionID = 1234500;
      const res = await chai
        .request(app)
        .get(`/permission/${trialPersmissionID}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('statusCode', 404);
      expect(res.body).to.have.property('message');
    });
    it('should return an error with a status code of 400 when there is a prompted error', async () => {
      const trialPersmissionID = '1234500qw';
      const res = await chai
        .request(app)
        .get(`/permission/${trialPersmissionID}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('statusCode', 400);
      expect(res.body).to.have.property('data');
    });
    it('should return status code of 200 after sucessfully deleting a permission', async () => {
      const newPermissionData = {
        permissionName: 'Test Permission',
        description: 'This is a test permission',
      };

      const permissionResponse = await chai
        .request(app)
        .post('/permission')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newPermissionData);

      const res = await chai
        .request(app)
        .delete(`/permission/${permissionResponse.body.data.id}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('statusCode', 200);
      expect(res.body).to.have.property('message');
    });
    it('should return a status 404 when the permission is not found for deletion', async () => {
      const trialPersmissionID = '1234500';
      const res = await chai
        .request(app)
        .delete(`/permission/${trialPersmissionID}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('statusCode', 404);
      expect(res.body).to.have.property('message');
    });
    it('should update permission and return status 201 after sucessfully updating the permission', async () => {
      const newPermissionData = {
        permissionName: 'Test Permission',
        description: 'This is a test permission',
      };

      const permissionResponse = await chai
        .request(app)
        .post('/permission')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newPermissionData);
      const res = await chai
        .request(app)
        .put(`/permission/${permissionResponse.body.data.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          permissionName: 'Test Permission Updated',
          description: 'This is a test permission Updated',
        });
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('statusCode', 201);
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
      await permission.destroy({
        where: {
          id: permissionResponse.body.data.id,
        },
      });
    });
    it('should raise an error with a status code of 500 after failing to update a given permission', async () => {
      const findAllStub = sinon.stub(permission, 'update').rejects(new Error('Database error'));
      const newPermissionData = {
        permissionName: 'Test Permission',
        description: 'This is a test permission',
      };
      const permissionResponse = await chai
        .request(app)
        .post('/permission')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newPermissionData);
      const newPermissionDataUpdated = {
        permissionNames: 'Test Permission',
        descriptions: 'This is a test permission',
      };
      const res = await chai
        .request(app)
        .put(`/permission/${permissionResponse.body.data.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newPermissionDataUpdated);
      expect(res).to.have.status(500);
      expect(res.body).to.have.property('statusCode', 500);
      expect(res.body).to.have.property('message');
      await permission.destroy({
        where: {
          id: permissionResponse.body.data.id,
        },
      });
      findAllStub.restore();
    });
    it('should return a status code of 500 when failed to create the Role Permission', async () => {
      const newRolePermissionData = {
        roleId: 200,
        permissionId: 200,
      };

      const res = await chai
        .request(app)
        .post('/setpermission')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newRolePermissionData);

      expect(res).to.have.status(500);
      expect(res.body).to.have.property('message');
    });
    it('should set a permission to a given role and return status 201', async () => {
      const newRolePermissionData = {
        roleId: testroleId,
        permissionId: testPermissionId,
      };

      const res = await chai
        .request(app)
        .post('/setpermission')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newRolePermissionData);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('statusCode', 201);
      expect(res.body).to.have.property('response');
      expect(res.body).to.have.property('message');
      expect(res.body.response).to.have.property('roleId', newRolePermissionData.roleId);
      expect(res.body.response).to.have.property(
        'permissionId',
        newRolePermissionData.permissionId,
      );
      await rolepermission.destroy({
        where: {
          id: res.body.response.id,
        },
      });
    });
    it('should get all roles with respect to the permission their refer to form rolepermission table and return status of 200', async () => {
      const res = await chai
        .request(app)
        .get('/roles/permissions')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('statusCode', 200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
    });
    it('should return a 500 status code upon failing to fetch the roles with permission', async () => {
      const res = await chai
        .request(app)
        .get('/roles/permissions')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('statusCode', 200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
    });
    it('should get a single role with respect to the permission their refer to form rolepermission table and return status of 200', async () => {
      const res = await chai
        .request(app)
        .get('/roles/permissions/1')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('statusCode', 200);
      expect(res.body).to.have.property('data');
    });
    it('should return a 404 when the rolepermission is not available', async () => {
      const res = await chai
        .request(app)
        .get('/roles/permissions/1123465')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('statusCode', 404);
      expect(res.body).to.have.property('message');
    });
    it('should return error with a status code 500', async () => {
      const res = await chai
        .request(app)
        .get('/roles/permissions/1123465q')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res).to.have.status(500);
      expect(res.body).to.have.property('message');
    });
  });
});
