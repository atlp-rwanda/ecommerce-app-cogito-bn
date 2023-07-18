import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it, before, after,
} from 'mocha';
import dotenv from 'dotenv';
import getOrderDetails from '../middleware/payment/getOrderDetails';
import updateOrderStatus from '../middleware/payment/updateOrderStatus';
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
  it('should return the order details for a valid order id', async () => {
    const orderDetails = await getOrderDetails(orderId);
    expect(orderDetails).to.be.an('object');
    expect(orderDetails).to.have.property('order_id');
    expect(orderDetails).to.have.property('buyerId');
    expect(orderDetails).to.have.property('productId');
    expect(orderDetails).to.have.property('shippingAddress');
    expect(orderDetails).to.have.property('totalCost');
    expect(orderDetails).to.have.property('paymentStatus');
    expect(orderDetails).to.have.property('shippingStatus');
    expect(orderDetails).to.have.property('deliveryDate');
  });
  it('should return null for an invalid order id', async () => {
    const invalidOrderId = '783942f1-37c7-4f86-1111-7f234205d000';
    const orderDetails = await getOrderDetails(invalidOrderId);
    expect(orderDetails).to.be.null;
  });
  it('should throw an error for a non-existent order id', async () => {
    const nonExistentOrderId = 'invalidOrderId';
    try {
      await getOrderDetails(nonExistentOrderId);
    } catch (error) {
      expect(error.message).to.equal('Error fetching order details');
    }
  });
  it('should update the order status to paid', async () => {
    await updateOrderStatus(orderId, 'paid');
    const orderDetails = await getOrderDetails(orderId);
    console.log(orderDetails);
    expect(orderDetails).to.be.an('object');
    expect(orderDetails).to.have.property('order_id');
    expect(orderDetails).to.have.property('buyerId');
    expect(orderDetails).to.have.property('productId');
    expect(orderDetails).to.have.property('shippingAddress');
    expect(orderDetails).to.have.property('totalCost');
    expect(orderDetails).to.have.property('paymentStatus');
    expect(orderDetails).to.have.property('shippingStatus');
    expect(orderDetails).to.have.property('deliveryDate');
    expect(orderDetails.paymentStatus).to.equal('paid'); // The Payment Status should be updated to paid
  });
});
