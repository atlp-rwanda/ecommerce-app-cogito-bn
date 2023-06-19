import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from '../../controllers/Auth/googleAuth';

dotenv.config();
const app = express.Router();
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google', failureMessage: true }),
  (req, res) => {
    const { token } = req;
    const { user } = req;
    const responseData = {
      token,
      user,
    };
    res.status(200).json(responseData);
  },
);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error');
});
export default app;
