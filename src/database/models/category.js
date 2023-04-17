const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
<<<<<<< HEAD:src/models/category.js
  category.init({
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'category',
  });
=======
  category.init(
    {
      name: DataTypes.STRING,
      product_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'category',
    },
  );
>>>>>>>  feat(signin): create the sign in feature:src/database/models/category.js
  return category;
};
