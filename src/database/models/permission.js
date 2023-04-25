const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class permission extends Model {
    static associate(models) {}
  }
  permission.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        type: DataTypes.INTEGER,
      },
      permissionName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'permission',
    },
  );
  return permission;
};
