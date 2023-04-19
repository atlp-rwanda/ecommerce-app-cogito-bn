import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';

dotenv.config();
const secret = process.env.JWT_KEY;

// eslint-disable-next-line import/prefer-default-export
export const usersignAccessToken = async (id, firstName, role) => {
  const payload = {
    id,
    firstName,
    role,
  };
  const options = { expiresIn: process.env.USER_LOGIN_JWT_EXPIRE };
  try {
    const token = await new Promise((resolve, reject) => {
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
    return { token };
  } catch (err) {
    throw new Error(err);
  }
};
