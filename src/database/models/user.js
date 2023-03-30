'use strict';
import { Model } from 'sequelize';

import { Sequelize, DataTypes } from 'sequelize';
import db from './index.js';
export const User = db.Sequelize.define('user', {
  carts_id: DataTypes.INTEGER,
  orders_id: DataTypes.INTEGER,
  wishlists_id: DataTypes.INTEGER,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING
});
