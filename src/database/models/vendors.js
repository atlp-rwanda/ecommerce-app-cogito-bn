const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class vendors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vendors.init(
    {
      userId: DataTypes.INTEGER,
      businessName: DataTypes.STRING,
      businessAddress: DataTypes.ARRAY(DataTypes.STRING),
      businessPhoneNumber: DataTypes.STRING,
      businessEmail: DataTypes.STRING,
      businessWebsite: DataTypes.STRING,
      businessDescription: DataTypes.STRING,
      businessLogo: DataTypes.STRING,
      productCategories: DataTypes.ARRAY(DataTypes.INTEGER),
      paymentMethods: DataTypes.ARRAY(DataTypes.INTEGER),
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'vendors',
    },
  );
  return vendors;
};
