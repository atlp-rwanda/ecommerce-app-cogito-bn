import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it, before, after,
} from 'mocha';
import dotenv from 'dotenv';
import app from '../index';
import { Category } from '../database/models';

const { expect } = chai;
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
