const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class payments extends Model {
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
  payments.init(
    {
      paymentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'order_id',
          onUpdate: 'CASCADE',
        },
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stripeId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'payments',
    },
  );
  return payments;
};
