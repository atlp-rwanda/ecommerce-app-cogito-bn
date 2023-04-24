/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifVendorJWT =  async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("entered", authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: req.t('not_logged_in') });
  }
  const token = await authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: req.t('invalid_token') });
    }
    req.email = decoded.email;
    req.roleId = decoded.roleId;
    req.name = decoded.name;
    req.id = decoded.id;
    return next();
  });
};

export default verifVendorJWT;
