import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from '../../controllers/Auth/googleAuth';

dotenv.config();
const successLoginUrl = `${process.env.BN_BASE_URL}/auth/google/success`;
const errorLoginUrl = `${process.env.BN_BASE_URL}/auth/google/failure`;
const app = express.Router();
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.set('Cross-Origin-Opener-Policy', 'same-origin'); // Set the COOP policy header
  next();
});
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginUrl,
  }),
  (req, res) => {
    req.session.token = req.user.Token;
    res.redirect(successLoginUrl);
  },
);
app.get('/google/success', (req, res) => {
  const { token } = req.session;
  delete req.session.token;
  if (token) {
    res.redirect(`${process.env.FN_COGITO_URL}/login/success?token=${token}`);
  } else {
    res.status(401).json({ status: 500, message: 'Login Failed' });
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error');
});
export default app;
