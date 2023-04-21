import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { user } from '../../database/models';

dotenv.config();
const secret = process.env.JWT_KEY;

const vendorAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.substring(7);
    const result = jwt.verify(token, secret);
    const authenticatedUser = await user.findByPk(result.id);
    if (authenticatedUser && authenticatedUser.role === 1) {
      req.authenticatedUser = authenticatedUser;
    }
  }
  next();
};
export default vendorAuth;
