const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.role, { foreignKey: "roleId" });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      phone: DataTypes.STRING,
      preferred_language: {
        type: DataTypes.STRING,
        field: "preferred_language",
      },
      preferred_currency: {
        type: DataTypes.STRING,
        field: "preferred_currency",
      },
      billingAddress: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: "billing_address",
      },
      password: DataTypes.STRING,
      resetToken: {
        type: DataTypes.STRING,
      },

      resetTokenExpiry: {
        type: DataTypes.STRING,
      },
      roleId: DataTypes.INTEGER,
      lastPasswordUpdate: DataTypes.STRING,
      confirmationCode: DataTypes.INTEGER,
      confirmed: DataTypes.BOOLEAN,
      status: DataTypes.STRING,
      otp: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
