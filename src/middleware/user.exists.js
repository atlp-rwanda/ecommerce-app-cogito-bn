import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { user } from '../database/models';

dotenv.config();
const isUserExist = async (req, res, next) => {
  const auth = req.get('authorization');
  if (auth) {
    const token = auth.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ status: err.status, message: err.message });
      } else {
        const { userId } = decodedToken;
        const { id } = req.params;
        if (userId === id) {
          try {
            const profile = await user.findByPk(id);
            if (!profile) {
              res.status(404).json({ status: 404, message: req.t('user_not_found'), data: {} });
            }
            next();
          } catch (error) {
            res
              .status(error.status)
              .json({ status: error.status, message: error.message, data: {} });
          }
        } else {
          res
            .status(401)
            .json({ status: 401, message: req.t('profile_update_unthorize_message'), data: {} });
        }
      }
    });
  } else {
    res.status(401).json({ status: 401, message: req.t('not_logged_in_message'), data: {} });
  }
};
export default isUserExist;
