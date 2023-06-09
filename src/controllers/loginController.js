import User from '../database/models/user';
import { hashpassword } from '../utils/hashPassword';
import { generateToken } from '../utils/token';

export const checkUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: 400, message: req.t('Provide Email and Password Message') });
  }
  if (!user) {
    req.body.password = hashpassword(password);
    return next();
  }
  return res.status(400).json({ status: 400, message: req.t('User does not exist Message') });
};
const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    return res.status(400).json({ status: 400, message: req.t('User does not exist Message') });
  }
  // console.log(password, user)
  if (password === user.password) {
    user.password = null;
    const token = generateToken({ user });

    return res.status(200).json({
      status: 200,
      user,
      token,
      message: req.t('Login Successfully message'),
    });
  }
  return res
    .status(400)
    .json({ status: 400, message: 'Invalid Password message' });
};

export default LoginUser;
