const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class productViews extends Model {
    static associate(models) {}
  }
  productViews.init(
    {
      productId: DataTypes.INTEGER,
      buyerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'productViews',
    },
  );
  return productViews;
};
