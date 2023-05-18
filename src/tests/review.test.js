import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it, before, beforeEach,
} from 'mocha';
import app from '../index';
import { review } from '../database/models';

chai.use(chaiHttp);
const { expect } = chai;
const reviewData = {
  productId: 1,
  message: 'Good product',
  rating: 3,
};
describe('Review product API', () => {
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
    await review.destroy({ where: {} });
  });

  describe('GET /review', () => {
    it('should create a review of a product', async () => {
      await review.create({ userId, productId: 1 });
      const res = await chai
        .request(app)
        .post('/review')
        .set('Authorization', `Bearer ${token}`)
        .send(reviewData);
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('productId', 1);
    });
  });
});
