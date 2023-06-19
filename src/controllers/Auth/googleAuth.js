import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { user } from '../../database/models';
import 'dotenv/config';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { displayName, _json } = profile;
      try {
        const email = profile.emails[0].value;
        const newUser = {
          email,
          password: 'Default',
          confirmationCode: '00000',
          name: displayName,
          gender: 'Default',
          phone: 'Default',
          preferred_language: _json.locale,
          preferred_currency: 'Default',
          billingAddress: ['Default'],
          birthdate: '2020-02-03',
          roleId: 3,
          confirmed: true,
        };
        const existingUser = await user.findOne({
          where: {
            email,
          },
        });
        if (existingUser) {
          const LoginToken = jwt.sign(
            {
              id: existingUser.id,
              email: existingUser.email,
              name: existingUser.name,
              roleId: existingUser.roleId,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' },
          );
          return done(null, { user: existingUser, token: LoginToken });
        }
        await user.create(newUser);
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    },
  ),
);
passport.serializeUser((userInfo, done) => {
  done(null, userInfo);
});
passport.deserializeUser(async (email, done) => {
  try {
    const newUser = await user.findOne({ where: { email } });
    if (!newUser) {
      return done(new Error('User not found'));
    }
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
});

export default passport;
