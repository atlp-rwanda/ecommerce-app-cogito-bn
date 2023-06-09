import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../index';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);
dotenv.config({ path: '.env' });

describe('GET /products/recommended/:id', () => {
  it('should return a list of recommended products based on the given product ID', async () => {
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
    const buyerId = 1; // set the ID of the Buyer you want to get recommendations for
    const response = await chai
      .request(app)
      .get(`/products/recommended/${buyerId}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).to.equal(200);
  });
});
