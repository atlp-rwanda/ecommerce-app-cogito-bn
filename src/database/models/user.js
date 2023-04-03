import {Sequelize, DataTypes} from 'sequelize';
import config from '../config/config.json';

const environment = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[environment]);

const User = sequelize.define('User', {
  orders_id: {
    type: DataTypes.INTEGER,
  },
  wishlists_id: {
    type: DataTypes.INTEGER,
  },
  carts_id: {
    type: DataTypes.INTEGER,
  },
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
  token: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
});

export default User;
