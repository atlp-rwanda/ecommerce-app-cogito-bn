const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wishlist.init(
    {
      name: DataTypes.STRING,
      seller_id: DataTypes.INTEGER,
      user_id: DataTypes.STRING,
      product_id: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.STRING,
      quantity: DataTypes.STRING,
      totalPrice: DataTypes.STRING,
      stock: DataTypes.STRING,
      Expire_Date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'wishlist',
    },
  );
  return wishlist;
};
