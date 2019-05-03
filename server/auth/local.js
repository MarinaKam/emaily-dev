const LocalStrategy = require('passport-local'),
    passport = require('passport');

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