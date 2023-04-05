const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.ARRAY(DataTypes.STRING),
      price: DataTypes.STRING,
      vendor_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'product',
    },
  );
  return product;
};
