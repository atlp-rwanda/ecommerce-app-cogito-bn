const dotenv = require('dotenv');
const JWT = require('jsonwebtoken');

dotenv.config();
const secret = process.env.JWT_KEY;

module.exports = {
  usersignAccessToken: (id, firstName, role) => new Promise((resolve, reject) => {
    const payload = {
      id,
      firstName,
      role,
    };
    const options = { expiresIn: process.env.USER_LOGIN_JWT_EXPIRE };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve({ token });
    });
  }),
};
