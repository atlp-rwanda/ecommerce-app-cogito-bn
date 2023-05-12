const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    },
  );
  return cart;
};
