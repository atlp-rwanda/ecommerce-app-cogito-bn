import express from 'express';
import userAuthController from "../../controllers/Auth/signupController";
import confirmationEmail from "../../controllers/Auth/confirmEmail";
import { getAllUsers, UserLogin, registerUsers } from '../../controllers/user/userController';

const router = express.Router();
router.get('/', getAllUsers);
router.post('/', registerUsers);
router.post('/login', UserLogin);
router.post("/signup", userAuthController.signUp);
router.get("/confirm/:confirmationCode", confirmationEmail.confirmEmail);
export default router;
