import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;
dotenv.config({ path: '.env' });

describe('Add Product to Cart Endpoint', () => {
  it('add to cart should return 403 if user is not authenticated', async () => {
    const UserLogin = await chai.request(app).post('/products/cart/add/1');
    expect(UserLogin).to.have.status(403);
  });
  it('add to cart should return 404 if product is not found or not available', async () => {
    const user = {
      email: 'kundaaggy@example.com',
      password: 'kunda123',
    };
    const userLogin = await chai
      .request(app)
      .post('/login')
      .send({ email: user.email, password: user.password });
    expect(userLogin.status).to.equal(200);
    const { token } = userLogin.body;
    const response = await chai
      .request(app)
      .post('/products/cart/add/1000000')
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(404);
  });
  it('add to cart should return 200 if product found and available', async () => {
    const user = {
      email: 'kundaaggy@example.com',
      password: 'kunda123',
    };
    const userLogin = await chai
      .request(app)
      .post('/login')
      .send({ email: user.email, password: user.password });
    expect(userLogin).to.have.status(200);
    const { token } = userLogin.body;
    const { data } = userLogin.body;
    const { id } = data;
    const addToCart = {
      userId: id,
      productId: 2,
      quantity: 1,
    };
    const response = await chai
      .request(app)
      .post(`/products/cart/add/${addToCart.productId}`)
      .send({
        userId: addToCart.userId,
        productId: addToCart.productId,
        quantity: addToCart.quantity,
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response).to.have.status(200);
  });
});
