import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../database/models';

dotenv.config();

const User = db.user;
const isUserEnabled = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.id;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    res.status(404).json({
      status: 404,
      message: req.t('user_not_found'),
    });
  }
  const userStatus = user.status;
  if (userStatus !== 'active') {
    res.status(401).json({
      status: 401,
      message: req.t('disactivated'),
    });
  }
  next();
};
export default isUserEnabled;
