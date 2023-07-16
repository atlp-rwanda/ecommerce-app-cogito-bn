import { user } from '../database/models';
import { addNotification } from './notificationController';
import { isPasswordMatching } from '../utils/hashPassword';

const updatePassword = async (req, res) => {
  const { id } = req.params;
  try {
    const User = {
      ...req.body,
    };

    if (!User.old_password || !User.new_password || !User.confirm_password) {
      return res.status(401).json({
        status: 401,
        message: req.t('Please_fill_Password'),
      });
    }
    // Find the user
    const Logged = await user.findOne({ where: { id } });
    if (!Logged) {
      return res.status(401).json({
        message: req.t('user_unexist_message'),
      });
    }
    if (!isPasswordMatching(User.old_password, Logged.password)) {
      console.log('Not Match');
      return res.status(401).json({
        message: req.t('old_password'),
      });
    }
    if (
      !User.new_password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i)
    ) {
      res.status(401).json({
        message: req.t('password_validation'),
      });
    }
    // update the password
    else if (User.new_password !== User.confirm_password) {
      return res.status(500).json({
        message: req.t('new_password'),
      });
    } else {
      Logged.password = await User.new_password;
      Logged.lastPasswordUpdate = new Date().toISOString();
      const notificationMessage = {
        subject: 'Password Update',
        message: `Hello ${Logged.name} your Password has been updated successfully! `,
        type: 'Password Update',
        emailBody: `<p> Dear <h2> ${Logged.name} </h2> We want to inform you that your password to Cogito Ecommerce have been changed successfully! </p>`,
      };
      await addNotification(Logged.email, Logged.id, notificationMessage);
      await Logged.save();
      return res.status(200).json({
        message: req.t('password_updated'),
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export default { updatePassword };
