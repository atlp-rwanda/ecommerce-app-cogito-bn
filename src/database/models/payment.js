const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
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
  payment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      method: DataTypes.STRING,
      discount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      stripeId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'payment',
    },
  );
  return payment;
};
