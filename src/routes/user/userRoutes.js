import express from 'express';
import userAuthController from '../../controllers/Auth/signupController';
import confirmationEmail from '../../controllers/Auth/confirmEmail';

const router = express.Router();
router.post('/buyer/signup', userAuthController.signUp);
router.get('/confirm/:confirmationCode', confirmationEmail.confirmEmail);
export default router;
