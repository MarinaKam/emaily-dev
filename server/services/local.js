const LocalStrategy = require('passport-local/lib'),
    passport = require('passport/lib');

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    (req, email, password, done) => {
        console.log(req);
        console.log(email);
        console.log(password);
    }
    )
);

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        console.log(req);
    }
    ));

module.exports = passport;