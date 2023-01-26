const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User");

function InitializingPassport(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, user.id);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.HOST}/google/callback`,
      },
      async function (accessToken, refreshToken, profile, done) {
       if (profile) {
          console.log(profile._json,'profile._json');
          User.findOne({ email: profile._json.email }).then(
            async (existingUser) => {
              if (existingUser) {
                done(null, existingUser);
              } else {
                new User({
                  googleId: profile.id,
                  firstname: profile._json.given_name,
                  lastname: profile._json.family_name,
                  email: profile._json.email,
                  picture: profile._json.picture
                })
                .save()
                .then((user) => {
                        done(null, user);
                });
              }
            }
          );
        }
      }
    )
  );
}
module.exports = InitializingPassport;