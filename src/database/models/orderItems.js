const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  orderItems.init(
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      unit_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'orderItems',
    },
  );
  return orderItems;
};
