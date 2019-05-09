const passport = require('passport/lib'),
    GoogleStrategy = require('passport-google-oauth20/lib');
const key = require('../config/keys');
const User = require('../models/user');

passport.use(new GoogleStrategy({
        clientID: key.googleAuth.clientID,
        clientSecret: key.googleAuth.clientSecret,
        callbackURL: key.googleAuth.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
        // User.findOrCreate(
            // { userId: profile.id },
            // { name: profile.displayName, userId: profile.id },
            // (err, user) => done(err, user)
        // );
        console.log('access token ', accessToken);
        console.log('refresh token ', refreshToken);
        console.log('profile: ', profile);
    }
));

module.exports = passport;