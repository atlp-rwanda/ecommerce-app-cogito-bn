import express from "express";
import passport from "../../controllers/Auth/facebookAuth";
import session from 'express-session';
const router = express.Router();
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);
export default router;
