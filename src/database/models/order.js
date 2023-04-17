const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class order extends Model {
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
<<<<<<< HEAD:src/models/order.js
<<<<<<< HEAD
=======
>>>>>>>  feat(signin): create the sign in feature:src/database/models/order.js
  order.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'order',
    },
  );
<<<<<<< HEAD:src/models/order.js
=======
  order.init({
    order_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    order_date: DataTypes.STRING,
    total_price: DataTypes.FLOAT,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'order',
  });
>>>>>>> feat(#BN-9: Two factor authentication for vendors): I added endpoints for sending OTP message to user's email, and another one for validating OTP submitted by the user
=======
>>>>>>>  feat(signin): create the sign in feature:src/database/models/order.js
  return order;
};
