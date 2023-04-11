const express = require('express');
const router = express.Router();
import User from '../../database/models/user';
const { sendPasswordResetEmail } = require('../../utils/email');
const crypto = require('crypto');

router.post('/forgot', async (req, res) => {
  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour

  // Save reset token and expiry to user
  await user.update({ resetToken, resetTokenExpiry });

  // Send password reset email
  await sendPasswordResetEmail(user.email, resetToken);

  res.json({ message: 'Password reset email sent' });
});

router.post('/reset', async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken) {
    return res.status(400).json({ message: 'Reset token not provided' });
  }

  // Check if reset token is valid
  const user = await User.findOne({ where: { resetToken, resetTokenExpiry:{$gt: Date.now()} } });
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired reset token' });
  }

  // Update user's password
  await user.update({ password: newPassword });

  // Clear reset token and expiry
  await user.update({ resetToken: null, resetTokenExpiry: null });

  res.json({ message: 'Password reset successful' });
});


module.exports = router;
