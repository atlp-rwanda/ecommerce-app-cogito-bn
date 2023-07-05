import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { user } from '../../database/models';
import 'dotenv/config';
import { hashPassword } from '../../utils/validation/hashedPassword';

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
        const existingUser = await user.findOne({ where: { email } });
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
          return done(null, { User: existingUser, Token: LoginToken });
        }
        const password = 'Default';
        const hashedPassword = await hashPassword(password);

        const newUser = {
          email,
          password: hashedPassword,
          confirmationCode: '00000',
          name: displayName,
          gender: 'Default',
          phone: 'Default',
          preferred_language: _json.locale,
          preferred_currency: 'Default',
          billingAddress: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
          birthdate: '2020-02-03',
          roleId: 3,
          confirmed: true,
        };

        const saveUser = await user.create(newUser);
        if (saveUser) {
          const LoginToken = jwt.sign(
            {
              id: saveUser.id,
              email: saveUser.email,
              name: saveUser.name,
              roleId: saveUser.roleId,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' },
          );
          return done(null, { User: saveUser, Token: LoginToken });
        }
      } catch (error) {
        return done(error);
      }
    },
  ),
);
passport.serializeUser((User, done) => {
  done(null, User.User.dataValues.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const UserInfo = await user.findOne({ where: { email } });
    if (!UserInfo) {
      return done(new Error('User not found'));
    }
    return done(null, UserInfo);
  } catch (error) {
    return done(error);
  }
});

export default passport;
