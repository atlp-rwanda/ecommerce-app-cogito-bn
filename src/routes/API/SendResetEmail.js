import express from 'express';
import crypto from 'crypto';
import { user } from '../../database/models';
import sendPasswordResetEmail from '../../utils/email';

const router = express.Router();

router.post('/forgot', async (req, res) => {
  const { email } = req.body;

  // Check if user exists

  const User = await user.findOne({ where: { email } });
  if (!User) {
    return res.status(404).json({ status: 404, message: req.t('User not found message') });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour

  // Save reset token and expiry to user
  User.resetToken = resetToken;
  User.resetTokenExpiry = resetTokenExpiry;
  await User.save();

  // Send password reset email
  await sendPasswordResetEmail(User.email, resetToken);

  return res.status(200).json({
    status: 200,
    message: req.t('Password reset email message'),
    data: User,
    token: resetToken,
  });
});

router.post('/reset/:resetToken', async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;
  console.log(req.params);
  if (!resetToken) {
    return res
      .status(400)
      .json({ status: 400, message: req.t('Reset token not provided message') });
  }
  if (!newPassword) {
    return res
      .status(400)
      .json({ status: 400, message: req.t('New Password Not Provided message') });
  }
  if (!newPassword) {
    return res
      .status(400)
      .json({ status: 400, message: req.t('New Password Not Provided message') });
  }

  // Check if reset token is valid
  const User = await user.findOne({ where: { resetToken } });
  if (!User) {
    return res.status(400).json({ status: 400, message: req.t('Invalid token message') });
  }
  // Update user's password
  User.resetToken = null;
  User.resetTokenExpiry = null;
  User.password = newPassword;
  await User.save();

  res.json({ status: 200, message: req.t('Password reset successfully message') });
});

export default router;
