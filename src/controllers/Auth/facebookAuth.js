import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { user } from "../../database/models";
import "dotenv/config";
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [newUser] = await user.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: {
            email: profile.emails[0].value,
            name: profile.displayName,
          },
        });
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
export default passport;
