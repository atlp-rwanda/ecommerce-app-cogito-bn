module.exports = function generateRandomPrice() {
  const minPrice = 10;
  const maxPrice = 3000;

  let price = Math.floor(Math.random() * (maxPrice - minPrice + 1) + minPrice);
  while (price % 5 !== 0) {
    price++;
  }

  return price;
};
