const bcrypt = require('bcrypt');
const { user } = require('../../database/models');
const { validateUserLogin } = require('../../middleware/user/UserValidator');
const { usersignAccessToken } = require('../../middleware/user/userJWT');

const getAllUsers = async (req, res) => {
  try {
    const User = await user.findAll();
    res
      .status(200)
      .json({
        success: true,
        message: 'Succesfully Retrieved all users from the database.',
        response: User,
      });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({
        success: false,
        message: 'Error in retrieving User from the database',
        Error: error.message,
      });
  }
};

// eslint-disable-next-line consistent-return
const UserLogin = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  try {
    const { error } = validateUserLogin(req.body);
    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({
          success: false,
          message: 'Input Validation Error',
          Error: error.details[0].message,
        });
    }
    const User = await user.findOne({ where: { email } });
    if (!User) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email, First Register with Cogito Team' });
    }
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const UserLoginToken = await usersignAccessToken(User.id, User.firstName, User.role);
    res
      .cookie('token', UserLoginToken, { httpOnly: true, secure: true })
      .status(200)
      .json({
        success: true,
        message: `${User.firstName} You Have LoggedIn Successfully!!`,
        token: UserLoginToken,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Server error - User Login Failed.', Error: error });
  }
};
const registerUsers = async (req, res) => {
  try {
    
    const userEmail = await user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userEmail) {
      return res
        .status(409)
        .json({ success: false, message: 'Users with this email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUsers = await user.create({
      orders_id: req.body.orders_id,
      wishlists_id: req.body.wishlists_id,
      carts_id: req.body.carts_id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    }); 
        res.status(201).json({
          success: true,
          message: 'Succesfully created a new Users.',
          response: newUsers,
        });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to create a new Users.', Error: error });
  }
};


module.exports = {
  getAllUsers,
  UserLogin,
  registerUsers,
};
