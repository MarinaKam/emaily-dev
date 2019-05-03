const express = require('express'),
    router = express.Router();

const passportFacebook = require('../auth/facebook');
const passportGoogle = require('../auth/google');
const passportLocal = require('../auth/local');

//LogIn router
router.get('/login', (req, res) => {
    res.send({ title: 'Please Sign In with:' });
});

router.post('/login', passportLocal.authenticate('local-login', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//     failureFlash: true
}));


//LogOut
router.get('/logout', (req, res) => {
    req.logout();
    res.send('You are log out');
    // res.redirect('/');
});

// Facebook
router.get('/facebook',
    passportFacebook.authenticate('facebook', { scope: ['email']}));

router.get('/facebook/callback',
    passportFacebook.authenticate('facebook'),
    // passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => res.send('This check the status of the request')
);

//Google
router.get('/google',
    passportGoogle.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passportGoogle.authenticate('google'),
    // passportGoogle.authenticate('google', { failureRedirect: '/login' }),
    // (req, res) => res.redirect('/')
);

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    res.send('You not login');
};

module.exports = router;