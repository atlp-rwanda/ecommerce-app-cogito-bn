import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it,
} from 'mocha';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Search Products', () => {
  it('should return a single product by ID', async () => {
    const res = await chai.request(app).get('/search?id=1');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.equal('tablet');
  });

  it('should return products by name', async () => {
    const res = await chai.request(app).get('/search?name=tablet');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].name).to.equal('tablet');
  });

  it('should return products by description', async () => {
    const res = await chai.request(app).get('/search?description=electronic device');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].description).to.equal('electronic device');
  });

  it('should return products by price', async () => {
    const res = await chai.request(app).get('/search?price=8k');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].price).to.equal('8k');
  });

  it('should return an error for invalid ID', async () => {
    const res = await chai.request(app).get('/search?id=invalid');
    expect(res).to.have.status(500);
    expect(res.body).to.be.an('object');
    expect(res.body.error).to.equal('Internal Server Error');
  });

  it("should return a message 'Product not found' for non-matching name", async () => {
    const res = await chai.request(app).get('/search?name=Non-existent');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.equal('Product not found');
  });
});
