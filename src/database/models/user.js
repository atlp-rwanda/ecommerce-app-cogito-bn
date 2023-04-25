const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      preferredLanguage: { type: DataTypes.STRING, field: 'preferred_language' },
      preferredCurrency: { type: DataTypes.STRING, field: 'preferred_currency' },
      billingAddress: { type: DataTypes.ARRAY(DataTypes.STRING), field: 'billing_address' },
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    },
    {
      sequelize,
      modelName: 'users',
    },
  );
  return user;
};
