const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      orders.belongsTo(models.product, { foreignKey: 'productId' });
    }
  }
  orders.init(
    {
      order_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      productId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      Tracking: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Confirmation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      totalCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM('pending', 'paid', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
      },
      shippingStatus: {
        type: DataTypes.ENUM('pending', 'shipped', 'delivered'),
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'orders',
    },
  );
  return orders;
};
