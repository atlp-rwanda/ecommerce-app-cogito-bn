
import {Sequelize, DataTypes} from 'sequelize';
import config from '../config/config.json';
const environment = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[environment]);
const User = sequelize.define('User', {

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetToken: {
   type: DataTypes.STRING
  } ,

  resetTokenExpiry: {
 type:    DataTypes.STRING
  } 
 
}, {
  freezeTableName: true,
});
export default User;