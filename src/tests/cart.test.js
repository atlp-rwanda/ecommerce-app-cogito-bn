import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it, before, beforeEach,
} from 'mocha';
import app from '../index';
import { cart } from '../database/models';

chai.use(chaiHttp);
const { expect } = chai;

describe('Cart API', () => {
  let token;
  let userId;
  before(async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send({ email: 'kundaaggy@example.com', password: 'kunda123' });
    userId = res.body.data.id;
    token = res.body.token;
  });

  beforeEach(async () => {
    await cart.destroy({ where: {} });
  });

  describe('GET /cart', () => {
    it('should return an empty array when user cart is empty', async () => {
      const res = await chai.request(app).get('/cart').set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('array').that.is.empty;
    });

    it('should return an array of products in cart when user cart is not empty', async () => {
      await cart.create({ userId, productId: 1 });
      await cart.create({ userId, productId: 2 });

      const res = await chai.request(app).get('/cart').set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('array').that.has.lengthOf(2);
      expect(res.body.data[0]).to.have.property('productId', 1);
      expect(res.body.data[1]).to.have.property('productId', 2);
    });
  });
});
