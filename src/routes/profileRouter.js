import express from 'express';
import profileController from '../controllers/profileController';
import profileValidation from '../middleware/profile.validator';
import isUserExist from '../middleware/user.exists';

const profileRouter = express.Router();

profileRouter
  .route('/:id')
  .get(profileController.getProfile)
  .put(isUserExist, profileValidation, profileController.updateProfile);

export default profileRouter;
