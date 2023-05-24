import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it, before, after,
} from 'mocha';
import dotenv from 'dotenv';
import app from '../index';
import {
  coupon, product, user, vendors, cart,
} from '../database/models';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

dotenv.config({ path: '.env' });

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const couponData = {
  coupon_code: 'cogito198',
  discount_type: 'Percentage',
  discount_percentage: 10,
  minimum_purchase_amount: 1,
  // associated_products: [2],
  start_date: today,
  end_date: tomorrow,
  usage_limit: 20,
};

const sellerUser = {
  name: 'Jane smith',
  email: 'janesmith44@gmail.com',
  gender: 'Female',
  phone: '0780000000',
  birthdate: '2023-04-07',
  preferred_language: 'en',
  preferred_currency: 'RF',
  billingAddress: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
  password: '123',
};

const buyerUser = {
  name: 'Jack smith',
  email: 'jacksmith44@gmail.com',
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
  email: 'administrator44@gmail.com',
  gender: 'Female',
  phone: '0780000000',
  birthdate: '2023-04-07',
  preferred_language: 'en',
  preferred_currency: 'RF',
  billingAddress: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
  password: '123',
  roleId: 1,
};

const vendorData = {
  businessName: 'test business204',
  businessAddress: ['KN 48B ST'],
  businessPhoneNumber: '+250781346188',
  businessEmail: 'ith.querries@gmail.com',
  businessWebsite: 'https://biteable.com/tools/image-resizer/',
  businessDescription: 'We are the Number One Wholesale company of all IT related product',
  businessLogo: 'https://www.pexels.com/photo/photo-of-computers-near-windows-3747481/',
  productCategories: [1],
  paymentMethods: [1],
  status: 'ACTIVE',
};

let firstCoupon;
let buyerToken;
let vendorId;
let sellerUserId;
let adminUserId;
let buyerUserId;
let productResponse;
let secondProductResponse;
let firstProdId;
let secondProdId;
let token;
let sellerToken;
let firstCartItem;
let firstCartItemId;
let secondCartItem;
let secondCartItemId;

before(async () => {
  const registerSellerRes = await chai.request(app).post('/register').send(sellerUser);
  sellerUserId = JSON.parse(registerSellerRes.text).data.id;
  vendorData.userId = sellerUserId;

  const registerAdminRes = await chai.request(app).post('/register').send(adminUser);
  adminUserId = JSON.parse(registerAdminRes.text).data.id;

  const res = await chai
    .request(app)
    .post('/login')
    .send({ email: adminUser.email, password: adminUser.password });
  token = res.body.token;

  const createVendorRes = await chai
    .request(app)
    .post('/vendors')
    .send(vendorData)
    .set({ Authorization: `Bearer ${token}` });

  vendorId = createVendorRes.body.response.id;

  const sellerLoginRes = await chai
    .request(app)
    .post('/login')
    .send({ email: sellerUser.email, password: sellerUser.password });
  sellerToken = sellerLoginRes.body.token;

  productResponse = await product.create({
    name: 'tablet',
    description: 'MacBook Pro',
    category_id: 1,
    vendor_id: vendorId,
    image: ['image.png'],
    price: 600,
    quantity: 100,
    stock: 'In Stock',
    expiredAt: '2025-04-23',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  firstProdId = productResponse.id;

  secondProductResponse = await product.create({
    name: 'tablet',
    description: 'MacBook Pro',
    category_id: 1,
    vendor_id: vendorId,
    image: ['image.png'],
    price: 600,
    quantity: 100,
    stock: 'In Stock',
    expiredAt: '2025-04-23',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  secondProdId = secondProductResponse.id;
});

after(async () => {
  await coupon.destroy({ where: { coupon_code: 'cogito198' } });
  await cart.destroy({ where: { id: firstCartItemId } });
  await cart.destroy({ where: { id: secondCartItemId } });
  await user.destroy({ where: { id: sellerUserId } });
  await user.destroy({ where: { id: adminUserId } });
  await user.destroy({ where: { id: buyerUserId } });
  await product.destroy({ where: { id: firstProdId } });
  await product.destroy({ where: { id: secondProdId } });
  await vendors.destroy({ where: { id: vendorId } });
});
describe('create coupon tests', () => {
  it('should create a coupon', async () => {
    couponData.vendorId = vendorId;
    couponData.associated_products = [secondProductResponse.id];

    const couponRes = await chai
      .request(app)
      .post('/coupon/create')
      .send(couponData)
      .set({ Authorization: `Bearer ${sellerToken}` });
    chai.expect(couponRes.status).to.equal(201);
    firstCoupon = JSON.parse(couponRes.text).data;
  });
});

describe("Retrieve seller's coupons tests", () => {
  it('should retrieve all coupons by a seller', async () => {
    const allCouponsRes = await chai
      .request(app)
      .post('/coupon/sellerCoupons')
      .send({ vendorId: couponData.vendorId })
      .set({ Authorization: `Bearer ${sellerToken}` });
    chai.expect(allCouponsRes.status).to.equal(200);

    const allCouponsJson = JSON.parse(allCouponsRes.text);
    const allSellerCoupons = allCouponsJson.data;
    expect(allSellerCoupons).to.deep.include(firstCoupon);
  });
});

describe('Apply coupon in checkout tests', () => {
  before(async () => {
    const registerBuyerRes = await chai.request(app).post('/register').send(buyerUser);
    buyerUserId = registerBuyerRes.body.data.id;

    const buyerRes = await chai
      .request(app)
      .post('/login')
      .send({ email: buyerUser.email, password: buyerUser.password });
    buyerToken = buyerRes.body.token;
    firstCartItem = await cart.create({
      userId: buyerUserId,
      productId: firstProdId,
      quantity: 1,
    });
    firstCartItemId = firstCartItem.id;
    secondCartItem = await cart.create({
      userId: buyerUserId,
      productId: secondProdId,
      quantity: 2,
    });
    secondCartItemId = secondCartItem.id;
  });
  it('should use a coupon in checkout', async () => {
    const applyCouponRes = await chai
      .request(app)
      .post('/coupon/checkout')
      .send({ coupon_code: couponData.coupon_code, totalPrice: 4200 })
      .set({ Authorization: `Bearer ${buyerToken}` });
    expect(applyCouponRes.status).to.equal(200);
    const applyCouponJson = JSON.parse(applyCouponRes.text);
    expect(applyCouponJson.totalDeductedAmount).to.equal(120);
  });
});

describe('update coupon tests', () => {
  it('should update a coupon', async () => {
    const updateCouponRes = await chai
      .request(app)
      .put('/coupon/update')
      .send({ id: firstCoupon.id, coupon_code: 'new17', vendorId: couponData.vendorId })
      .set({ Authorization: `Bearer ${sellerToken}` });
    expect(updateCouponRes.status).to.equal(200);
    const updateCouponJson = JSON.parse(updateCouponRes.text);
    const updatedCoupon = updateCouponJson.data;
    expect(updatedCoupon.coupon_code).to.be.equal('new17');
    await coupon.destroy({ where: { coupon_code: 'new17' } });
  });
});
