const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {}
  }
  RolePermission.init(
    {
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'role',
          key: 'id',
        },
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'permission',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'rolepermission',
    },
  );
  return RolePermission;
};
