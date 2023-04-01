import express from 'express';
import userAuthController from "../../controllers/Auth/signupController"
const router = express.Router();

router.post("/signup" , userAuthController.signUp)



export default router;