import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../index';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);
dotenv.config({ path: '.env' });
describe('Get Product Information', () => {
  describe('GET /products/buyer/:id', () => {
    it('should return the product with the given ID and store it in the productViews Table', async () => {
      const user = {
        email: 'kundaaggy@example.com',
        password: 'kunda123',
      };
      const response = await chai
        .request(app)
        .post('/login')
        .send({ email: user.email, password: user.password });
      expect(response.status).to.equal(200);
      const { token } = response.body;

      const productId = 2; // set the ID of the product you want to retrieve
      const findProductById = await chai
        .request(app)
        .get(`/products/buyer/${productId}`)
        .set({ Authorization: `Bearer ${token}` });
      expect(findProductById.status).to.equal(200);
    });
  });
  describe('GET /products/buyer', () => {
    it('should return all products information, minus the expired one', async () => {
      const user = {
        email: 'kundaaggy@example.com',
        password: 'kunda123',
      };
      const response = await chai
        .request(app)
        .post('/login')
        .send({ email: user.email, password: user.password });
      expect(response.status).to.equal(200);
      const { token } = response.body;
      const getAllProducts = await chai
        .request(app)
        .get('/products/buyer')
        .set({ Authorization: `Bearer ${token}` });
      expect(getAllProducts.status).to.equal(200);
    });
  });
});
