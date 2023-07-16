import express from "express";
import {
  verify,
  sendOtp,
  deleteUser,
} from "../../controllers/vendor/OTPController";
import { createUser, loginUser } from "../../controllers/userController";
import verifyJWT from "../../middleware/verifyJWT";
import passwordPromptt from "../../middleware/passwordPrompt";

const usersRouter = express.Router();

usersRouter.post("/verify", verifyJWT, verify);
usersRouter.get("/sendOtp", verifyJWT, sendOtp);
usersRouter.delete("/deleteUser", deleteUser);
usersRouter.post("/register", createUser);
usersRouter.post("/login", passwordPromptt.passwordPrompt, loginUser);

export default usersRouter;
