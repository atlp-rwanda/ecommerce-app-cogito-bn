import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it, before, after,
} from 'mocha';
import dotenv from 'dotenv';
import app from '../index';
import { Category, product } from '../database/models';

chai.should();
chai.use(chaiHttp);

dotenv.config({ path: '.env' });

let categoryId;

before(async () => {
  const newCategory = await Category.create({
    name: 'test_category',
    image: 'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
  });
  categoryId = newCategory.id;
});

after(async () => {
  await Category.destroy({ where: { id: categoryId } });
});
describe('GET /category', () => {
  it('should retrieve all categories', async () => {
    const res = await chai.request(app).get('/category');
    chai.expect(res.status).to.equal(200);
    const resJson = JSON.parse(res.text);
    const allCategories = resJson.data;

    const result = allCategories.find((obj) => obj.id === categoryId);
    result.should.not.be.undefined;
  });
});

describe('GET /category/{id}', () => {
  it('should retrieve products in a certain category', async () => {
    const productResponse = await product.create({
      name: 'tablet',
      description: 'MacBook Pro',
      category_id: categoryId,
      vendor_id: 1,
      image: ['image.png'],
      price: 600,
      quantity: 100,
      stock: 'In Stock',
      expiredAt: '2025-04-23',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const firstProdId = productResponse.id;
    const res = await chai.request(app).get(`/category/${categoryId}`);
    chai.expect(res.status).to.equal(200);
    const resJson = JSON.parse(res.text);
    const products = resJson.data;

    const result = products.find((obj) => obj.id === firstProdId);
    result.should.not.be.undefined;
  });
});
