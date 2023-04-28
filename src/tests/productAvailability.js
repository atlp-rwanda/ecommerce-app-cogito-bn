import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import speakeasy from 'speakeasy';
import Bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import app from '../index';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);
dotenv.config({ path: '.env' });

describe('API tests', () => {
  describe('GET /product/available', () => {
    it("It should create a product, change it's availability, and delete it", async () => {
      const product = {
        name: 'shoes J1',
        description: 'running',
        categoryId: 1,
        image: ['image.png'],
        price: 600,
        quantity: 100,
        stock: 'In Stock',
        expiryDate: '2035-03-27',
      };

      const user = {
        name: 'John',
        email: 'test1809@gmail.com',
        gender: 'Female',
        birthdate: '2023-04-07',
        preferredLanguage: 'en',
        preferredCurrency: 'RF',
        billingAddress: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
        password: '123',
        roleId: 2,
      };

      const userRes = await chai.request(app).post('/OTP/register').send(user);
      userRes.should.have.status(201);

      const response = await chai
        .request(app)
        .post('/OTP/login')
        .send({ email: user.email, password: user.password });
      response.should.have.status(200);
      const { token } = response.body;
      product.vendorId = response.body.data.id;

      const res = await chai
        .request(app)
        .post('/product/create')
        .send(product)
        .set({ Authorization: `Bearer ${token}` });
      res.should.have.status(201);

      const productId = res.body.data.id;

      const resAvailability = await chai
        .request(app)
        .post('/product/availability')
        .send({ productId, vendorId: product.vendorId })
        .set({ Authorization: `Bearer ${token}` });
      resAvailability.should.have.status(200);
      let responseJson = JSON.parse(resAvailability.text);
      let modifiedProduct = responseJson.data[1];
      expect(modifiedProduct[0].available).to.be.equal(false);
      expect(modifiedProduct[0].stock).to.be.equal('Out of Stock');

      const resAvailable = await chai
        .request(app)
        .post('/product/availability')
        .send({ productId, vendorId: product.vendorId })
        .set({ Authorization: `Bearer ${token}` });
      resAvailable.should.have.status(200);
      responseJson = JSON.parse(resAvailable.text);
      modifiedProduct = responseJson.data[1];
      expect(modifiedProduct[0].available).to.be.equal(true);
      expect(modifiedProduct[0].stock).to.be.equal('In Stock');

      const resUnavailable = await chai
        .request(app)
        .post('/product/availability')
        .send({ productId, vendorId: product.vendorId, stockStatus: 'Expired' })
        .set({ Authorization: `Bearer ${token}` });
      resUnavailable.should.have.status(200);
      responseJson = JSON.parse(resUnavailable.text);
      modifiedProduct = responseJson.data[1];
      expect(modifiedProduct[0].available).to.be.equal(false);
      expect(modifiedProduct[0].stock).to.be.equal('Expired');

      const deleteProductRes = await chai
        .request(app)
        .delete('/product/delete')
        .send({ id: productId })
        .set({ Authorization: `Bearer ${token}` });
      deleteProductRes.should.have.status(200);

      const deleteUserRes = await chai
        .request(app)
        .delete('/OTP/deleteUser')
        .send({ email: user.email });
      deleteUserRes.should.have.status(200);
    });
  });
});
