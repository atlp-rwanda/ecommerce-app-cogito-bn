import JWT from 'jsonwebtoken';
import db from '../database/models';

const User = db.user;
const isUserEnabled = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.user.id;
  const user = await User.findOne({ where: { id: userId } });
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
