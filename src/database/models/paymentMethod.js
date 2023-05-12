const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  payment.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      logo: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    },
    {
      sequelize,
      modelName: 'payment',
    },
  );
  return payment;
};
