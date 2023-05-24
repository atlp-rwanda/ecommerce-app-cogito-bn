import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it, before, after,
} from 'mocha';
import dotenv from 'dotenv';
import app from '../index';
import { user, orders } from '../database/models';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

dotenv.config({ path: '.env' });

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const buyerUser = {
  name: 'Jack smith',
  email: 'jacksmith92@gmail.com',
  gender: 'Female',
  phone: '0780000000',
  birthdate: '2023-04-07',
  preferred_language: 'en',
  preferred_currency: 'RF',
  billingAddress: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
  password: '123',
};

const adminUser = {
  name: 'Mrs. Admin',
  email: 'administrator92@gmail.com',
  gender: 'Female',
  phone: '0780000000',
  birthdate: '2023-04-07',
  preferred_language: 'en',
  preferred_currency: 'RF',
  billingAddress: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
  password: '123',
  roleId: 1,
};

let adminUserId;
let adminToken;
let buyerUserId;
let buyerToken;
let orderResponse;
let orderId;

before(async () => {
  const registerAdminRes = await chai.request(app).post('/register').send(adminUser);
  adminUserId = JSON.parse(registerAdminRes.text).data.id;

  const res = await chai
    .request(app)
    .post('/login')
    .send({ email: adminUser.email, password: adminUser.password });
  adminToken = res.body.token;

  const registerBuyerRes = await chai.request(app).post('/register').send(buyerUser);
  buyerUserId = registerBuyerRes.body.data.id;

  const buyerRes = await chai
    .request(app)
    .post('/login')
    .send({ email: buyerUser.email, password: buyerUser.password });
  buyerToken = buyerRes.body.token;

  orderResponse = await orders.create({
    buyerId: buyerUserId,
    productId: ['1'],
    shippingAddress: ['123 Main St', 'Apt 4B', 'New York, NY 10001'],
    totalCost: 5000,
    paymentStatus: 'pending',
    shippingStatus: 'pending',
    deliveryDate: tomorrow,
  });

  orderId = orderResponse.dataValues.order_id;
});

after(async () => {
  await orders.destroy({ where: { order_id: orderResponse.order_id } });
  await user.destroy({ where: { id: adminUserId } });
  await user.destroy({ where: { id: buyerUserId } });
});

describe('retrieve order status', () => {
  it('should retrieve order status', async () => {
    const orderRes = await chai
      .request(app)
      .get(`/order/getStatus/${orderId}`)
      .set({ Authorization: `Bearer ${buyerToken}` });
    chai.expect(orderRes.status).to.equal(200);
    const orderResJson = JSON.parse(orderRes.text);
    expect(orderResJson.orderStatus).to.equal('pending');
    expect(orderResJson.deliveryDate).to.equal(tomorrow.toISOString());
  });
});

describe('update order status', () => {
  it('should update order status', async () => {
    const orderRes = await chai
      .request(app)
      .put(`/order/update/${orderId}`)
      .send({ status: 'shipped', deliveryDate: '2023-05-02T08:27:23.010Z' })
      .set({ Authorization: `Bearer ${adminToken}` });
    chai.expect(orderRes.status).to.equal(200);
    const orderResJson = JSON.parse(orderRes.text);
    expect(orderResJson.orderstatus).to.equal('shipped');
    expect(orderResJson.deliveryDate).to.equal('2023-05-02T08:27:23.010Z');
  });
});
