import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('updateCart', () => {
  let buyerToken;

  before(async () => {
    const buyerCredentials = { email: 'kundaaggy@example.com', password: 'kunda123' };
    const buyerResponse = await chai.request(app).post('/login').send(buyerCredentials);
    buyerToken = buyerResponse.body.token;
  });

  it('should update the quantity and total price of a cart item', async () => {
    const res = await chai
      .request(app)
      .put('/cart/2')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ neededQuantity: 40 });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Cart item updated successfully');
    expect(res.body.cart).to.be.an('array');
    expect(res.body.cart).to.have.lengthOf(1);
    expect(res.body.cart[0]).to.deep.include({});
  });

  it('should return an error message if the product is not found', async () => {
    const res = await chai
      .request(app)
      .put('/cart/100')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ neededQuantity: 30 });
    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal('Cart item not found');
  });

  it('should return an error message if the cart item is not found', async () => {
    const res = await chai
      .request(app)
      .put('/cart/25')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ neededQuantity: 20 });
    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal('Cart item not found');
  });

  it('should return a message if you purchase more quantity', async () => {
    const res = await chai
      .request(app)
      .put('/cart/25')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send({ neededQuantity: 5000 });

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('You are not allowed to purchase more than 50 products');
  });
});

describe('when attempting to update a product as a non-buyer user', () => {
  let sellerToken;
  before(async () => {
    const sellerCredentials = { email: 'john@example.com', password: 'kunda123' };
    const response = await chai.request(app).post('/login').send(sellerCredentials);
    sellerToken = response.body.token;
  });

  it('should return an error message if the user is not a buyer', async () => {
    const res = await chai
      .request(app)
      .put('/cart/2')
      .set('Authorization', `Bearer ${sellerToken}`)
      .send({ neededQuantity: 300 });
    expect(res.status).to.equal(403);
    expect(res.body.message).to.equal('You are not authorized to perform this action');
  });
});
