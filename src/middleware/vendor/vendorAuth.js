const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { user } = require('../../database/models');

dotenv.config();
const secret = process.env.JWT_KEY;

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.substring(7);
    const result = jwt.verify(token, secret);
    const authenticatedUser = await user.findByPk(result.id);
    if (authenticatedUser) {
      if (authenticatedUser.role === 'admin') {
        req.authenticatedUser = authenticatedUser;
      }
    }
  }
  next();
};
