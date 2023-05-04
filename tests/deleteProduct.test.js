import axios from 'axios';
import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../src/index';

const should = chai.should();

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe('Product API', function () {
  this.timeout(10000);
  const productId = '';

  describe('DELETE /product/{id}', () => {
    it('should delete a specific product', (done) => {
      const productId = '5';
      chai
        .request(app)
        .delete(`/product/${productId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('product deleted successfully.');
        });
      done();
    });
  });
});
