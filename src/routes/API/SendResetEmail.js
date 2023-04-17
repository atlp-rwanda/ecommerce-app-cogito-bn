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
    return res.status(404).json({ message: 'User not found' });
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
  message: 'Password reset email sent',
  data: user,
  token: resetToken
});
});

router.post('/reset/:resetToken', async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword} = req.body;
console.log(req.params);
  if (!resetToken) {
    return res.status(400).json({ message: 'Reset token not provided' });
  }
  if(!newPassword){
    return res.status(400).json({message:"New Password Not Provided"});
  }

  // Check if reset token is valid
  const user = await User.findOne({ where: { resetToken } });
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired reset token' });
  }
  // Update user's password
  user.resetToken= null
  user.resetTokenExpiry=null
  user.password = newPassword
  await user.save();


  res.json({ message: 'Password reset successful' });
});


// router.get('/reset/:resetToken', async (req, res) => {
//   const { resetToken } = req.params;
// console.log(req.params);
//   if (!resetToken) {
//     return res.status(400).json({ message: 'Reset token not provided' });
//   }
//   // if(!newPassword){
//   //   return res.status(400).json({message:"New Password Not Provided"});
//   // }

//   // Check if reset token is valid
//   const user = await User.findOne({ where: { resetToken } });
//   if (!user) {
//     return res.status(400).json({ message: 'Invalid or expired reset token' });
//   }
//   // Update user's password
//   user.resetToken= null
//   user.resetTokenExpiry=null
//   user.password = 'newPassword'
//   await user.save();


//   res.json({ message: 'Password reset successful' });
// });


module.exports = router;
