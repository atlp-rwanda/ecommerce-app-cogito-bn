import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { user } from '../database/models';

dotenv.config();
const secret = process.env.ACCESS_TOKEN_SECRET;

const buyerAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.substring(7);
      const result = jwt.verify(token, secret);
      const authenticatedBuyer = await user.findByPk(result.id);
      if (authenticatedBuyer && authenticatedBuyer.roleId === 3) {
        req.authenticatedBuyer = authenticatedBuyer;
      }
    }
    next();
  } catch (error) {
    return next();
  }
};
export default buyerAuth;