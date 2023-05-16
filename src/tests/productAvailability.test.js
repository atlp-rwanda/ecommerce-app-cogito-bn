// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { describe, it, before, after } from 'mocha';
// import sinon from 'sinon';
// import dotenv from 'dotenv';
// import CloudUpload from '../utils/cloudinary/cloudinary';
// import app from '../index';
// import { product, user as User } from '../database/models';

// const { expect, assert } = chai;
// chai.should();
// chai.use(chaiHttp);

// dotenv.config({ path: '.env' });

// const req = {
//   body: {
//     name: 'Testing product 106',
//     description: 'Test description',
//     price: 10000,
//     quantity: 10,
//     stock: 'In Stock',
//     category_id: 1,
//     expiredAt: '2023-12-31',
//   },
// };
// const user = {
//   name: 'Jack smith',
//   email: 'janesmithdoe2@gmail.com',
//   gender: 'Female',
//   phone: '0780000000',
//   birthdate: '2023-04-07',
//   preferred_language: 'en',
//   preferred_currency: 'RF',
//   billingAddress: [
//     'KN 12 St, Kigali, Rwanda',
//     'Nyarugenge',
//     'Kigali',
//     'Rwanda',
//   ],
//   password: '123',
//   roleId: 2,
// };
// const files = [];
// const fakeImage = [
//   'https://example.com/image.jpg',
//   'https://example.com/image.jpg',
//   'https://example.com/image.jpg',
//   'https://example.com/image.jpg',
// ];
// const CloudUploadMock = {
//   multi: () => fakeImage,
// };
// // sinon.stub(CloudUpload, 'multi').callsFake(CloudUploadMock.multi);

// describe('API tests', () => {
//   before(async () => {
//     // await sequelize.sync({ force: true });
//     console.log('=============start of before each=============');
//     await product.destroy({ truncate: true });
//     await User.destroy({ truncate: true });
//     console.log('=============end of before each=============');
//   });
//   describe('GET /product/availability', () => {
//     it("It should create a product, change it's availability, and delete it", async () => {
//       const userRes = await chai.request(app).post('/register').send(user);
//       userRes.should.have.status(201);

//       const response = await chai
//         .request(app)
//         .post('/login')
//         .send({ email: user.email, password: user.password });
//       response.should.have.status(200);
//       const { token } = response.body;

//       const createdProduct = await chai
//         .request(app)
//         .post('/products/add')
//         .set('Authorization', `Bearer ${token}`)
//         .set('Content-Type', 'multipart/form-data')
//         .field(req.body)
//         .field('image', files);
//       chai.expect(createdProduct.status).to.equal(201);

//       const resText = JSON.parse(createdProduct.text);
//       const newProduct = resText.data;
//       expect(newProduct.stock).to.be.equal('In Stock');

//       const productId = newProduct.id;

//       const resAvailability = await chai
//         .request(app)
//         .post('/products/availability')
//         .send({ productId, vendorId: newProduct.vendor_id })
//         .set({ Authorization: `Bearer ${token}` });
//       resAvailability.should.have.status(200);

//       const resAvailabilityJson = JSON.parse(resAvailability.text);
//       const modifiedProduct = resAvailabilityJson.data[1];
//       expect(modifiedProduct[0].stock).to.be.equal('Out of Stock');

//       const resAvailable = await chai
//         .request(app)
//         .post('/products/availability')
//         .send({ productId, vendorId: newProduct.vendor_id })
//         .set({ Authorization: `Bearer ${token}` });
//       resAvailable.should.have.status(200);

//       const resAvailableJson = JSON.parse(resAvailable.text);
//       const availableProduct = resAvailableJson.data[1];
//       expect(availableProduct[0].stock).to.be.equal('In Stock');

//       const deleteProductRes = await chai
//         .request(app)
//         .delete('/products/delete')
//         .send({ id: productId })
//         .set({ Authorization: `Bearer ${token}` });
//       deleteProductRes.should.have.status(200);

//       const deleteUserRes = await chai
//         .request(app)
//         .delete('/Otp/deleteUser')
//         .send({ email: user.email });
//       deleteUserRes.should.have.status(200);
//     });
//   });
// });

// describe('POST /products/available', () => {
//   it('It should create a product, check if it is retrieved in the available products lists, and delete it', async () => {
//     const userRes = await chai.request(app).post('/register').send(user);
//     userRes.should.have.status(201);

//     const response = await chai
//       .request(app)
//       .post('/login')
//       .send({ email: user.email, password: user.password });
//     response.should.have.status(200);
//     const { token } = response.body;

//     const createdProduct = await chai
//       .request(app)
//       .post('/products/add')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Content-Type', 'multipart/form-data')
//       .field(req.body)
//       .field('image', files);
//     chai.expect(createdProduct.status).to.equal(201);

//     const resText = JSON.parse(createdProduct.text);
//     const newProduct = resText.data;
//     expect(newProduct.stock).to.be.equal('In Stock');

//     const productId = newProduct.id;

//     const resAvailable = await chai
//       .request(app)
//       .post('/products/available')
//       .send({ vendorId: newProduct.vendor_id })
//       .set({ Authorization: `Bearer ${token}` });
//     resAvailable.should.have.status(200);
//     const responseJson = JSON.parse(resAvailable.text);
//     const availableProducts = responseJson.data;

//     const result = availableProducts.find((obj) => obj.id === productId);
//     result.should.not.be.undefined;

//     const deleteProductRes = await chai
//       .request(app)
//       .delete('/products/delete')
//       .send({ id: productId })
//       .set({ Authorization: `Bearer ${token}` });
//     deleteProductRes.should.have.status(200);

//     const deleteUserRes = await chai
//       .request(app)
//       .delete('/Otp/deleteUser')
//       .send({ email: user.email });
//     deleteUserRes.should.have.status(200);
//   });
// });

// describe('POST /products/unavailable', () => {
//   it('It should create a product, change its availability to false, check if it is retrieved in the unavailable products lists, and delete it', async () => {
//     const userRes = await chai.request(app).post('/register').send(user);
//     userRes.should.have.status(201);

//     const response = await chai
//       .request(app)
//       .post('/login')
//       .send({ email: user.email, password: user.password });
//     response.should.have.status(200);
//     const { token } = response.body;

//     const createdProduct = await chai
//       .request(app)
//       .post('/products/add')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Content-Type', 'multipart/form-data')
//       .field(req.body)
//       .field('image', files);
//     chai.expect(createdProduct.status).to.equal(201);

//     const resText = JSON.parse(createdProduct.text);
//     const newProduct = resText.data;
//     expect(newProduct.stock).to.be.equal('In Stock');

//     const productId = newProduct.id;

//     const resAvailability = await chai
//       .request(app)
//       .post('/products/availability')
//       .send({ productId, vendorId: newProduct.vendor_id })
//       .set({ Authorization: `Bearer ${token}` });
//     resAvailability.should.have.status(200);

//     const resAvailabilityJson = JSON.parse(resAvailability.text);
//     const modifiedProduct = resAvailabilityJson.data[1];
//     expect(modifiedProduct[0].stock).to.be.equal('Out of Stock');

//     const resUnavailable = await chai
//       .request(app)
//       .post('/products/unavailable')
//       .send({ vendorId: newProduct.vendor_id })
//       .set({ Authorization: `Bearer ${token}` });
//     resUnavailable.should.have.status(200);
//     const responseJson = JSON.parse(resUnavailable.text);
//     const availableProducts = responseJson.data;

//     const result = availableProducts.find((obj) => obj.id === productId);
//     result.should.not.be.undefined;

//     const deleteProductRes = await chai
//       .request(app)
//       .delete('/products/delete')
//       .send({ id: productId })
//       .set({ Authorization: `Bearer ${token}` });
//     deleteProductRes.should.have.status(200);

//     const deleteUserRes = await chai
//       .request(app)
//       .delete('/Otp/deleteUser')
//       .send({ email: user.email });
//     deleteUserRes.should.have.status(200);
//   });
// });
