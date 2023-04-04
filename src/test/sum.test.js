import chai from 'chai';
const expect = chai.expect;
function sum(a, b) {
  return a + b;
}
describe('sum function', () => {
  it('should return the sum of two positive numbers', () => {
    const result = sum(2, 3);
    expect(result).to.equal(5);
  });
  it('should return the sum of a positive and a negative number', () => {
    const result = sum(2, -3);
    expect(result).to.equal(-1);
  });
  it('should return the sum of two negative numbers', () => {
    const result = sum(-2, -3);
    expect(result).to.equal(-5);
  });
});