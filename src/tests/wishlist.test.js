// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import {
//   describe, it, before, beforeEach,
// } from 'mocha';
// import app from '../index';
// import { wishlist } from '../database/models';

// chai.use(chaiHttp);
// const { expect } = chai;

// describe('Wishlist API', () => {
//   let token;
//   let userId;
//   before(async () => {
//     const res = await chai
//       .request(app)
//       .post('/login')
//       .send({ email: 'kundaaggy@example.com', password: 'kunda123' });
//     userId = res.body.data.id;
//     token = res.body.token;
//   });

//   beforeEach(async () => {
//     await wishlist.destroy({ where: {} });
//   });

//   describe('GET /wishlist', () => {
//     it('should return an empty array when the wishlist is empty', async () => {
//       const res = await chai.request(app).get('/wishlist').set('Authorization', `Bearer ${token}`);
//       expect(res).to.have.status(200);
//       expect(res.body.data).to.be.an('array').that.is.empty;
//     });

//     it('should return an array of products in the wishlist when the wishlist is not empty', async () => {
//       await wishlist.create({ userId, productId: 1 });
//       await wishlist.create({ userId, productId: 2 });

//       const res = await chai.request(app).get('/wishlist').set('Authorization', `Bearer ${token}`);
//       expect(res).to.have.status(200);
//       expect(res.body.data).to.be.an('array').that.has.lengthOf(2);
//       expect(res.body.data[0]).to.have.property('productId', 1);
//       expect(res.body.data[1]).to.have.property('productId', 2);
//     });
//   });

//   describe('POST /wishlist', () => {
//     it('should add a product to the wishlist when the product is not already in the wishlist', async () => {
//       const res = await chai
//         .request(app)
//         .post('/wishlist')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ productId: 1 });
//       expect(res).to.have.status(200);
//       expect(res.body.data).to.have.property('productId', 1);

//       const result = await wishlist.findOne({ where: { userId, productId: 1 } });
//       expect(result).to.not.be.null;
//     });

//     it('should return an error message when the product is already in the wishlist', async () => {
//       await wishlist.create({ userId, productId: 1 });

//       const res = await chai
//         .request(app)
//         .post('/wishlist')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ userId, productId: 1 });
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.not.be.null;

//       const count = await wishlist.count({ where: { userId, productId: 1 } });
//       expect(count).to.equal(1);
//     });
//   });
// });
