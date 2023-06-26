import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it, before, after,
} from 'mocha';
import dotenv from 'dotenv';
import app from '../index';
import { user } from '../database/models';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

dotenv.config({ path: '.env' });

const buyerUser = {
  name: 'Jack smith',
  email: 'jacksmith2135@gmail.com',
  gender: 'Female',
  phone: '0780000000',
  birthdate: '2023-04-07',
  preferred_language: 'en',
  preferred_currency: 'RF',
  billingAddress: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
  password: '123',
};

let buyerUserId;
let token;

before(async () => {
  const registerBuyerRes = await chai.request(app).post('/register').send(buyerUser);
  buyerUserId = JSON.parse(registerBuyerRes.text).data.id;

  const res = await chai
    .request(app)
    .post('/login')
    .send({ email: buyerUser.email, password: buyerUser.password });
  token = res.body.token;
});

after(async () => {
  await user.destroy({ where: { id: buyerUserId } });
});
describe('create get user profile tests', () => {
  it('should retrieve user profile', async () => {
    const res = await chai.request(app).get(`/profile/${buyerUserId}`);
    chai.expect(res.status).to.equal(200);
    const resJson = JSON.parse(res.text);
    expect(resJson.data.id).to.equal(buyerUserId);
  });
});

describe('create update user profile tests', () => {
  it('should update user profile', async () => {
    const updatedProfile = {
      name: 'Jane Jackson',
      phone: '0789999999',
      preferredLanguage: 'English',
      preferredCurrency: 'USD',
    };
    const res = await chai.request(app).put(`/profile/${buyerUserId}`).send(updatedProfile).set({ Authorization: `Bearer ${token}` });
    chai.expect(res.status).to.equal(200);
    const resJson = JSON.parse(res.text);
    expect(resJson.data.name).to.equal('Jane Jackson');
    expect(resJson.data.phone).to.equal('0789999999');
    expect(resJson.data.preferred_language).to.equal('English');
    expect(resJson.data.preferred_currency).to.equal('USD');
  });
});
