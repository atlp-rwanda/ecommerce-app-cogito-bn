import express from "express";
import userAuthController from "../../controllers/Auth/signupController";
import confirmationEmail from "../../controllers/Auth/confirmEmail";
import DeleteAllBuyers from "../../controllers/Auth/deleteAllBuyers";

const router = express.Router();
router.post("/signup", userAuthController.signUp);
router.get("/confirm/:confirmationCode", confirmationEmail.confirmEmail);
router.delete("/delete", DeleteAllBuyers.deleteBuyers);

export default router;