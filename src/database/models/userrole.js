const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userRole extends Model {
    static associate(models) {}
  }
  userRole.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'role',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'userRole',
    },
  );
  return userRole;
};
