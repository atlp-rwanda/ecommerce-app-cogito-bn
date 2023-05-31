const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      review.belongsTo(models.user);
      review.belongsTo(models.product);
    }
  }
  review.init(
    {
      userId: { type: DataTypes.INTEGER, field: 'user_id' },
      productId: { type: DataTypes.INTEGER, field: 'product_id' },
      rating: DataTypes.INTEGER,
      review: DataTypes.TEXT,
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    },
    {
      sequelize,
      modelName: 'review',
    },
  );
  return review;
};
