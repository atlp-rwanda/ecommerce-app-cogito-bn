import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import {
  describe, it, before, after,
} from 'mocha';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
import app from '../index';
import CloudUpload from '../utils/cloudinary/cloudinary';
import { product } from '../database/models';

chai.use(chaiHttp);
dotenv.config({ path: '.env' });

const req = {
  body: {
    name: 'product',
    description: 'Test description',
    price: 10,
    quantity: 10,
    stock: 'In Stock',
    category_id: 1,
    expiredAt: '2023-12-31',
  },
};
after(async () => {
  await product.destroy({ where: { [Op.or]: [{ name: 'product' }, { name: 'Updated Product' }] } });
});
describe('createNewProduct', () => {
  let token;
  let productId;
  before(async () => {
    const res = await chai
      .request(app)
      .post('/login')
      .send({ email: 'john@example.com', password: 'kunda123' });
    token = res.body.token;
  });
  it('should create a new product successfully', async () => {
    const files = [];
    const fakeImage = [
      'https://example.com/image.jpg',
      'https://example.com/image.jpg',
      'https://example.com/image.jpg',
      'https://example.com/image.jpg',
    ];
    const CloudUploadMock = {
      multi: () => fakeImage,
    };
    // sinon.stub(CloudUpload, 'multi').callsFake(CloudUploadMock.multi);
    const res = await chai
      .request(app)
      .post('/products/add')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .field(req.body)
      .field('image', files);
    chai.expect(res.status).to.equal(201);
    productId = res.body.data.id;
  });
  it('should return 409 status for duplicate product', (done) => {
    const files = [];
    chai
      .request(app)
      .post('/products/add')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .field(req.body)
      .field('image', files)
      .end((error, res) => {
        chai.expect(res.status).to.equal(409);
        done();
      });
  });
  it('should fetch product details successfully', async () => {
    const res = await chai
      .request(app)
      .get(`/product/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    chai.expect(res.status).to.equal(200);
    chai.expect(res.body).to.be.an('object');
  });
  it('should update an existing product successfully', async () => {
    const updateData = {
      name: 'Updated Product',
      description: 'Updated Test description',
      price: 20,
      quantity: 5,
      stock: 'Out of Stock',
      category_id: 2,
    };
    const files = [];
    const res = await chai
      .request(app)
      .get(`/product/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    console.log(res.body);
    chai.expect(res.status).to.equal(200);
    chai.expect(res.body).to.be.an('object');
    chai.expect(res.body.item.price).to.equal(req.body.price);
  });
  it('should return an error message if the product is not found', async () => {
    const productID = 99999;
    const res = await chai
      .request(app)
      .get(`/product/${productID}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    chai.expect(res.status).to.equal(404);
    chai.expect(res.body).to.be.an('object');
    chai.expect(res.body.error).to.equal('Item not found');
  });
  it('should allow delete on update product', async () => {
    const ImageFiles = await product.findAll({
      where: { id: productId },
      attributes: ['image'],
      raw: true,
    });
    const updateData = {
      name: 'Updated Product',
      description: 'Updated Test description',
      price: 20,
      quantity: 5,
      stock: 'Out of Stock',
      category_id: 2,
      deletedImages: ImageFiles[0].image[0],
    };
    const files = [];
    const res = await chai
      .request(app)
      .put(`/product/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .field(updateData)
      .field('image', files);
    chai.expect(res.status).to.equal(200);
    chai.expect(res.body.item.name).to.equal(updateData.name);
    chai.expect(res.body.item.description).to.equal(updateData.description);
    chai.expect(res.body.item.price).to.equal(updateData.price);
    chai.expect(res.body.item.quantity).to.equal(updateData.quantity);
    chai.expect(res.body.item.stock).to.equal(updateData.stock);
    chai.expect(res.body.item.category_id).to.equal(updateData.category_id);
  });
});
