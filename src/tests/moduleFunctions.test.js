import chai from 'chai';
import {
  describe, it, before, after,
} from 'mocha';
import sinon from 'sinon';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import vendorSignAccessToken from '../middleware/vendor/vendorJWT';
import { generateConfirmationCode } from '../utils/validation/generateCode';
import isBcryptHashed from '../utils/validation/checkHashedPassword';
import generateRandomPrice from '../utils/randomPrice';

dotenv.config();
const secret = process.env.JWT_KEY;
const { expect } = chai;
describe('All Module Functions Test', () => {
  describe('Check Hashed Password', () => {
    it('should return true for a valid bcrypt hashed password', async () => {
      const hashedPassword = '$2a$10$Zz6Jp6LfvKjU63x7jez8FugzmfcHTe.n05bY2..7rbU5HQWGrx5ya';
      const result = await isBcryptHashed(hashedPassword);
      expect(result).to.equal(true);
    });

    it('should return false for an invalid bcrypt hashed password', async () => {
      const invalidPassword = 'invalid_hashed_password';
      const result = await isBcryptHashed(invalidPassword);
      expect(result).to.equal(false);
    });

    it('should return false for a non-bcrypt hashed password', async () => {
      const nonBcryptPassword = 'plainpassword';
      const result = await isBcryptHashed(nonBcryptPassword);
      expect(result).to.equal(false);
    });
  });
  describe('Generate Random Price', () => {
    it('should generate a random price between 10 and 3000', () => {
      const price = generateRandomPrice();
      expect(price).to.be.a('number').and.to.be.at.least(10).and.to.be.at.most(3000);
    });

    it('should generate a price that is a multiple of 5', () => {
      const price = generateRandomPrice();
      expect(price % 5).to.equal(0);
    });

    it('should generate different prices on each call', () => {
      const price1 = generateRandomPrice();
      const price2 = generateRandomPrice();
      expect(price1).to.not.equal(price2);
    });
  });
  describe('vendorSignAccessToken', () => {
    let signStub;
    const id = 123;
    const fullName = 'John Doe';
    const status = 'active';
    const token = 'your_generated_token';

    before(() => {
      signStub = sinon.stub(JWT, 'sign').resolves(token);
    });

    after(() => {
      signStub.restore();
    });

    it('should call JWT.sign with the correct payload, secret, and options', async () => {
      const expectedPayload = { id, fullName, status };
      const expectedOptions = { expiresIn: process.env.VENDOR_LOGIN_JWT_EXPIRE };

      await vendorSignAccessToken(id, fullName, status);

      expect(signStub.calledOnce).to.be.true;
      expect(signStub.calledWith(expectedPayload, secret, expectedOptions)).to.be.true;
    });

    it('should return an object containing the token', async () => {
      const result = await vendorSignAccessToken(id, fullName, status);
      expect(result).to.be.an('object');
    });
  });
  describe('generateConfirmationCode', () => {
    it('should generate a 6-digit confirmation code as a string', () => {
      const code = generateConfirmationCode();
      expect(code).to.be.a('string');
      expect(code).to.have.lengthOf(6);
      expect(Number(code)).to.be.a('number').that.is.within(100000, 999999);
    });
  });
});
