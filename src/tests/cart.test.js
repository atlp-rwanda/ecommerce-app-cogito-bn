import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after } from 'mocha';
import app from '../index';
import { cart, user, role, product } from '../database/models';

chai.use(chaiHttp);
const { expect } = chai;

describe('Cart API', () => {
  let token;
  let userId;
  let testUser;
  let productResponse;
  let regularUser;

  describe('GET /cart', () => {
    before(async () => {
      regularUser = await role.create({
        roleName: 'User',
        description: 'regular user',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      productResponse = await product.create({
        name: 'tablet',
        description: 'MacBook Pro',
        category_id: '1',
        vendor_id: '1',
        image: ['image.png'],
        price: 600,
        quantity: 100,
        stock: 'In Stock',
        expiredAt: '2025-04-23',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await chai
        .request(app)
        .post('/register')
        .send({
          name: 'Jack smith',
          email: 'janesmithdoe@gmail.com',
          gender: 'Female',
          phone: '0780000000',
          birthdate: '2023-04-07',
          preferred_language: 'en',
          preferred_currency: 'RF',
          billingAddress: [
            'KN 12 St, Kigali, Rwanda',
            'Nyarugenge',
            'Kigali',
            'Rwanda',
          ],
          password: '123',
          roleId: regularUser.id,
        });

      testUser = res.body.data;

      const resUser = await chai
        .request(app)
        .post('/login')
        .send({ email: 'janesmithdoe@gmail.com', password: '123' });

      userId = resUser.body.data.id;
      token = resUser.body.token;
    });
    after(async () => {
      await cart.destroy({ where: {} });
      await user.destroy({ where: {} });
      await role.destroy({ where: {} });
      await product.destroy({ where: {} });
    });
    it('should return an empty array when user cart is empty', async () => {
      const res = await chai
        .request(app)
        .get('/cart')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('array').that.is.empty;
    });

    it('should return an array of products in cart when user cart is not empty', async () => {
      await cart.create({ userId, productId: productResponse.id });
      const res = await chai
        .request(app)
        .get('/cart')
        .set('Authorization', `Bearer ${token}`);
      expect(res).to.have.status(200);
      expect(res.body.data).to.be.an('array').that.has.lengthOf(1);
      expect(res.body.data[0]).to.have.property(
        'productId',
        productResponse.id
      );
    });
  });
});
