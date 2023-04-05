const dotenv = require('dotenv');
const JWT = require('jsonwebtoken');

dotenv.config();
const secret = process.env.JWT_KEY;

module.exports = {
  vendorSignAccessToken: (id, fullName, email, status) => new Promise((resolve, reject) => {
    const payload = {
      id,
      fullName,
      email,
      status,
    };
    const options = {};
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve({ token });
    });
  }),
};
