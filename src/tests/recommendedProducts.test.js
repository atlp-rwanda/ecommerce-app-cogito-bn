import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../index';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);
dotenv.config({ path: '.env' });

describe('GET /products/:id', () => {
  it('should return the product with the given ID and store it in the productViews Table', async () => {
    const user = {
      email: 'kundaaggy@example.com',
      password: 'kunda123',
    };
    const response = await chai
      .request(app)
      .post('/OTP/login')
      .send({ email: user.email, password: user.password });
    expect(response.status).to.equal(200);
    const { token } = response.body;

    const productId = 1; // set the ID of the product you want to retrieve
    const findProductById = await chai
      .request(app)
      .get(`/products/${productId}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(findProductById.status).to.equal(200);
  });
});

describe('GET /products/recommended/:id', () => {
  it('should return a list of recommended products based on the given product ID', async () => {
    const user = {
      email: 'kundaaggy@example.com',
      password: 'kunda123',
    };
    const userLogin = await chai
      .request(app)
      .post('/OTP/login')
      .send({ email: user.email, password: user.password });
    expect(userLogin.status).to.equal(200);
    const { token } = userLogin.body;
    const buyerId = 1; // set the ID of the Buyer you want to get recommendations for
    const response = await chai
      .request(app)
      .get(`/products/recommended/${buyerId}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).to.equal(200);
  });
});
