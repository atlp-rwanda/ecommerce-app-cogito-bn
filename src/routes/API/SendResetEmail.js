const express = require('express');
const router = express.Router();
import { use } from 'chai';
import User from '../../database/models/user';
const { sendPasswordResetEmail } = require('../../utils/email');
const crypto = require('crypto');

router.post('/forgot', async (req, res) => {
  const { email } = req.body;

  // Check if user exists
  
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({status: 404,
      message: req.t('User not found message')});
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour

  // Save reset token and expiry to user
  user.resetToken= resetToken
  user.resetTokenExpiry=resetTokenExpiry
  await user.save();

  // Send password reset email
  await sendPasswordResetEmail(user.email, resetToken);

 return res.status(200).json({
  status: 200,
  message: req.t('Password reset email message') ,
  data: user,
  token: resetToken
});
});

router.post('/reset/:resetToken', async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword} = req.body;
console.log(req.params);
  if (!resetToken) {
    return res.status(400).json({ status:400, message: req.t('Reset token not provided message')  });
  }
  if(!newPassword){
    return res.status(400).json({ status:400, message: req.t ("New Password Not Provided message")});
  }

  // Check if reset token is valid
  const user = await User.findOne({ where: { resetToken } });
  if (!user) {
    return res.status(400).json({ status:400, message: req.t('Invalid token message')  });
  }
  // Update user's password
  user.resetToken= null
  user.resetTokenExpiry=null
  user.password = newPassword
  await user.save();


  res.json({ status: 200, message: req.t("Password reset successfully message")  });
});





module.exports = router;
