const passport = require('passport/lib'),
    FacebookStrategy = require('passport-facebook/lib');

const User = require('../models/user');
const key = require('../config/keys');

passport.use(new FacebookStrategy({
        clientID: key.facebookAuth.clientID,
        clientSecret: key.facebookAuth.clientSecret,
        callbackURL: key.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    (accessToken, refreshToken, profile, cb) => {
        // User.findOrCreate({name: profile.displayName}, {name: profile.displayName, userId: profile.id},
        //     (err, user) => {
        //     if (err) return cb(err);
        //     cb(null, user);
        // });
        console.log('access token ', accessToken);
        console.log('refresh token ', refreshToken);
        console.log('profile: ', profile);
    }
    )
);

module.exports = passport;