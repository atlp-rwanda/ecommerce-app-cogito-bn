import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Role API', () => {
  let token;

  before(async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send({ email: 'leo@example.com', password: 'kunda123' });

    token = res.body.token;
  });

  describe('GET /role', () => {
    it('should return an array of roles when the roles table is not empty', async () => {
      const res = await chai.request(app).get('/role').set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('array').that.has.lengthOf(3);
      expect(res.body.data[0]).to.have.property('roleName', 'Admin');
      expect(res.body.data[1]).to.have.property('roleName', 'Vendor');
    });
  });
  describe('GET /role/{id}', () => {
    it('should return an array of single role', async () => {
      const res = await chai.request(app).get('/role/1').set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('object');
      expect(res.body.data).to.have.property('roleName', 'Admin');
    });
  });
  describe('GET /permission', () => {
    it('should return an array of permissions', async () => {
      const res = await chai
        .request(app)
        .get('/permission')
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('array');
      expect(res.body.data[0]).to.have.property('permissionName', 'Manages users');
    });
  });
  describe('GET /role/{id}', () => {
    it('should return an array of permission role', async () => {
      const res = await chai
        .request(app)
        .get('/permission/1')
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('object');
      expect(res.body.data).to.have.property('permissionName', 'Manages users');
    });
  });
});
