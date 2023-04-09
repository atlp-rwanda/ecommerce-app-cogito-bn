const dotenv = require('dotenv');
const JWT = require('jsonwebtoken');

dotenv.config();
const secret = process.env.JWT_KEY;

module.exports = {
  vendorSignAccessToken: (id, fullName, status) => new Promise((resolve, reject) => {
    const payload = {
      id,
      fullName,
      status,
    };
    const options = { expiresIn: process.env.VENDOR_LOGIN_JWT_EXPIRE };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve({ token });
    });
  }),
};
