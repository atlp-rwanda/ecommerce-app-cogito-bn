import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { user } from '../../database/models';
import 'dotenv/config';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [newUser, created] = await user.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: null,
            role: 'buyer',
            confirmationCode: null,
            confirmed: true,
          },
        });
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    },
  ),
);
passport.serializeUser((newUser, done) => {
  done(null, newUser.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const newUser = await user.findByPk(id);
    done(null, newUser);
  } catch (error) {
    done(error);
  }
});
export default passport;
