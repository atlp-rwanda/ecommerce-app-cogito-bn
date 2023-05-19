const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    static associate(models) {
      // define association here
      cart.belongsTo(models.product);
    }
  }
  cart.init(
    {
      userId: { type: DataTypes.INTEGER, field: 'user_id' },
      productId: { type: DataTypes.INTEGER, field: 'product_id' },
      quantity: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
     
    
    },
    {
      sequelize,
      modelName: 'cart',
      tableName: 'carts',
    },
  );

  return cart;
};