import express from 'express';
import User from "../../database/models/user"
const router = express.Router();
router.get('/confirm/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId);
  user.is_verified = true;
  await user.save();

  res.status(200).json({
    message: 'Email confirmed successfully'
  });
});

export default router;
