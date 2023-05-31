const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class coupon extends Model {
    static associate(models) {
      // define association here
      coupon.belongsTo(models.vendors, {
        foreignKey: 'vendor_id',
        as: 'vendors',
        onDelete: 'CASCADE',
      });
    }
  }
  coupon.init(
    {
      coupon_code: DataTypes.STRING,
      discount_type: DataTypes.ENUM('Percentage', 'Flat discount'),
      discount_amount: DataTypes.DOUBLE,
      discount_percentage: DataTypes.DOUBLE,
      minimum_purchase_amount: DataTypes.INTEGER,
      vendor_id: DataTypes.INTEGER,
      associated_products: DataTypes.ARRAY(DataTypes.INTEGER),
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      usage_limit: DataTypes.INTEGER,
      usage_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'coupon',
    },
  );
  return coupon;
};
