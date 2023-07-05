/* eslint-disable no-unused-expressions */
import chai from 'chai';
import { describe, it } from 'mocha';
import isBcryptHashed from '../utils/validation/checkHashedPassword';

const { expect } = chai;
describe('isBcryptHashed', () => {
  it('should return true for a valid bcrypt hashed password', async () => {
    const validHashedPassword = '$2b$10$0raU.yYX9L5sfenaJl2nJOpqF3BmVxQerfO913Uc/cx.T2lUeZaM6';

    const result = await isBcryptHashed(validHashedPassword);

    expect(result).to.be.true;
  });

  it('should return false for an invalid bcrypt hashed password', async () => {
    const invalidHashedPassword = 'invalidPassword';

    const result = await isBcryptHashed(invalidHashedPassword);

    expect(result).to.be.false;
  });

  it('should return false for a non-hashed password', async () => {
    const plainTextPassword = 'password123';

    const result = await isBcryptHashed(plainTextPassword);

    expect(result).to.be.false;
  });
});
