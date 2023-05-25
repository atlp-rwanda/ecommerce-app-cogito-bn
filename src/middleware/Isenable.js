import db from '../database/models';
import JwtUtility from '../utils/jwt';

const isEnable = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: req.t('token_unexist_message') });
  }
  try {
    const decodedToken = JwtUtility.verifyToken(token.split(' ')[1]);
    const { id, roleId } = decodedToken.value;
    const user = await db.user.findOne({
      where: { id },
    });

    if (user && decodedToken && roleId === 3) {
      req.body.userId = id;
      next();
    } else {
      res.status(403).json({ message: req.t('unauthorised_message') });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t('server_error_message') });
  }
};

export default isEnable;
