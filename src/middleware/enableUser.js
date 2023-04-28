import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { user } from '../database/models';

dotenv.config();

// const User = db.user;
const isVendorEnabled = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.id;
  const User = await user.findOne({ where: { id: userId } });
  if (!User) {
    res.status(404).json({
      status: 404,
      message: req.t('user_not_found'),
    });
  }
  const userStatus = User.status;
  if (userStatus !== 'active') {
    res.status(401).json({
      status: 401,
      message: req.t('disactivated'),
    });
  }
  next();
};
export default isVendorEnabled;
