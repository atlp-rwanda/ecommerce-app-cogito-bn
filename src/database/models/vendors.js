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
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      businessName: DataTypes.STRING,
      businessAddress: DataTypes.STRING,
      businessPhoneNumber: DataTypes.STRING,
      businessEmail: DataTypes.STRING,
      businessWebsite: DataTypes.STRING,
      businessDescription: DataTypes.STRING,
      businessLogo: DataTypes.STRING,
      productCategories: DataTypes.STRING,
      paymentMethods: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'vendors',
    },
  );
  return vendors;
};
