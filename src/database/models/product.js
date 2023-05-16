const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.hasMany(models.orders, { foreignKey: 'productId' });
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.ARRAY(DataTypes.STRING),
      price: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      vendor_id: DataTypes.INTEGER,
      stock: DataTypes.ENUM('In Stock', 'Out of Stock', 'Expired'),
      expiredAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'product',
    },
  );
  return product;
};
