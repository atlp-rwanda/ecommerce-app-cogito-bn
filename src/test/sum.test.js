import chai from 'chai';
const expect = chai.expect;
// Function to test
function sum(a, b) {
  return a + b;
}
// Test suite
describe('sum function', () => {
  // Test case 1
  it('should return the sum of two positive numbers', () => {
    const result = sum(2, 3);
    expect(result).to.equal(5);
  });
  // Test case 2
  it('should return the sum of a positive and a negative number', () => {
    const result = sum(2, -3);
    expect(result).to.equal(-1);
  });
  // Test case 3
  it('should return the sum of two negative numbers', () => {
    const result = sum(-2, -3);
    expect(result).to.equal(-5);
  });
});