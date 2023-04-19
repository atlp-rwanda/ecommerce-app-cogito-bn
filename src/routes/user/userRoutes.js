import express from "express";
import userAuthController from "../../controllers/Auth/signupController";
import confirmationEmail from "../../controllers/Auth/confirmEmail";
const { getAllUsers, UserLogin, registerUsers } = require('../../controllers/user/userController');
const router = express.Router();
router.post("/signup", userAuthController.signUp);
router.get("/confirm/:confirmationCode", confirmationEmail.confirmEmail);
router.get('/', getAllUsers);
router.post('/', registerUsers);
router.post('/login', UserLogin);

export default router;
