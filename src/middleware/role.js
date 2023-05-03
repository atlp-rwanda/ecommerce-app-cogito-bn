import db from '../database/models';
import JwtUtility from '../utils/jwt';

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: req.t('token_unexist_message') });
  }
  try {
    const decodedToken = JwtUtility.verifyToken(token);
    const { id, roleId } = decodedToken.value;
    const User = await db.user.findOne({
      where: { id },
    });
    if (User && decodedToken && roleId == 1) {
      next();
    } else {
      res.status(403).json({ message: req.t('unauthorised_message') });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t('unauthorised_message') });
  }
};
const isSeller = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: req.t('token_unexist_message') });
  }
  try {
    const decodedToken = JwtUtility.verifyToken(token.split(' ')[1]);
    const { id, roleId } = decodedToken.value;
    const User = await db.user.findOne({
      where: { id },
    });
    if (User && decodedToken && roleId === 2) {
      req.vendor = id;
      next();
    } else {
      res.status(403).json({ message: req.t('unauthorised_message') });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t('unauthorised_message') });
  }
};
const isBuyer = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: req.t('token_unexist_message') });
  }

  try {
    const decodedToken = JwtUtility.verifyToken(token);
    const { id, roleId } = decodedToken.value;
    console.log(decodedToken);
    const user = await db.user.findOne({
      where: { id },
    });
    if (user && decodedToken && roleId === 3) {
      next();
    } else {
      res.status(403).json({ message: req.t('unauthorised_message') });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: req.t('server_error_message') });
  }
};
const checkPermission = (permission) => async (req, res, next) => {
  try {
    const token = getToken(req);
    const decodedToken = decodeToken(token);
    const User = await findUser(decodedToken.value.id);
    checkAuthorization(User, decodedToken.value.roleId, permission);
    next();
  } catch (error) {
    handleError(res, error);
  }
};

const getToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token not provided');
  }
  return authHeader.split(' ')[1];
};

const decodeToken = (token) => {
  try {
    return JwtUtility.verifyToken(token);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

const findUser = async (id) => {
  const User = await db.user.findOne({ where: { id } });
  if (!User) {
    throw new Error('User not found');
  }
  return User;
};

const checkAuthorization = (userId, roleId, permissionId) => {
  const permissions = {
    6: ['manage users'],
    3: ['manage products'],
    2: ['view products'],
  };
  if (!permissions[roleId]?.includes(permissionId)) {
    throw new Error('You are not authorized to perform this action');
  }
};

const handleError = (res, error) => {
  console.error(error);
  const status = error.status || 500;
  res.status(status).json({ message: error.message });
};

export {
  isAdmin, isSeller, isBuyer, checkPermission,
};
