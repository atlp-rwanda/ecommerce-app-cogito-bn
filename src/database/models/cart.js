const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
<<<<<<< HEAD:src/models/cart.js
  cart.init({
    user_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    date_added: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'cart',
  });
=======
  cart.init(
    {
      user_id: DataTypes.STRING,
      product_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'cart',
    },
  );
>>>>>>>  feat(signin): create the sign in feature:src/database/models/cart.js
  return cart;
};
