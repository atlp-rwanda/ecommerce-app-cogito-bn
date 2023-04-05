const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.product.hasOne(wishlist, { foreignKey: 'product_id', as: 'product' });
      wishlist.belongsTo(models.product);
    }
  }
  wishlist.init(
    {
      userId: { type: DataTypes.INTEGER, field: 'user_id' },
      productId: { type: DataTypes.INTEGER, field: 'product_id' },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    },
    {
      sequelize,
      modelName: 'wishlist',
    },
  );
  return wishlist;
};
