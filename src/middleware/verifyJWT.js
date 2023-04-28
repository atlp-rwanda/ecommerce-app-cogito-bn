/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: req.t('not_logged_in') });
  }
  const token = await authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: req.t('invalid_token') });
    }
    req.email = decoded.email;
    req.role = decoded.role;
    req.firstName = decoded.firstName;
    req.lastName = decoded.lastName;
    req.id = decoded.id;
    return next();
  });
}
