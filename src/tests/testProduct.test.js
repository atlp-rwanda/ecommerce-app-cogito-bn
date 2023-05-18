// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { describe, it } from 'mocha';
// import dotenv from 'dotenv';
// import app from '../index';

// const { expect } = chai;
// chai.should();
// chai.use(chaiHttp);
// dotenv.config({ path: '.env' });

// describe('getProductById', () => {
//   it('should return a specific product when given a valid id', async () => {
//     const res = await chai.request(app).get('/user/products/1');

//     expect(res.status).to.equal(200);
//   });

//   it('should return a 404 status code when given an invalid id', async () => {
//     const res = await chai.request(app).get('/user/products/9999');

//     expect(res.status).to.equal(404);
//   });

//   it('should return a 404 status code when the product is out of stock', async () => {
//     const res = await chai.request(app).get('/user/products');

//     expect(res.status).to.equal(404);
//   });
// });
