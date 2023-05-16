// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import sinon from 'sinon';
// import {
//   describe, it, before, after,
// } from 'mocha';
// import app from '../index';
// import CloudUpload from '../utils/cloudinary/cloudinary';
// import { product } from '../database/models';
// chai.use(chaiHttp);
// const req = {
//   body: {
//     name: 'Testing2',
//     description: 'Test description',
//     price: 10000,
//     quantity: 10,
//     stock: 'In Stock',
//     category_id: 1,
//     expiredAt: '2023-12-31',
//   },
// };
// after(async () => {
//   await product.destroy({ where: { name: 'Testing2' } });
// });
// describe('createNewProduct', () => {
//   let token;
//   before(async () => {
//     const res = await chai
//       .request(app)
//       .post('/login')
//       .send({ email: 'john@example.com', password: 'kunda123' });
//     token = res.body.token;
//   });
//   it('should create a new product successfully', (done) => {
//     const files = [];
//     const fakeImage = [
//       'https://example.com/image.jpg',
//       'https://example.com/image.jpg',
//       'https://example.com/image.jpg',
//       'https://example.com/image.jpg',
//     ];
//     const CloudUploadMock = {
//       multi: () => fakeImage,
//     };
//     sinon.stub(CloudUpload, 'multi').callsFake(CloudUploadMock.multi);
//     chai
//       .request(app)
//       .post('/products/add')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Content-Type', 'multipart/form-data')
//       .field(req.body)
//       .field('image', files)
//       .end((error, res) => {
//         chai.expect(res.status).to.equal(201);
//         done();
//       });
//   });
//   it('should return 409 status for duplicate product', (done) => {
//     const files = [];
//     chai
//       .request(app)
//       .post('/products/add')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Content-Type', 'multipart/form-data')
//       .field(req.body)
//       .field('images', files)
//       .end((error, res) => {
//         chai.expect(res.status).to.equal(409);
//         done();
//       });
//   });
// });
