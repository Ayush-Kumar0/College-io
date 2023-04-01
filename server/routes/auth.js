const express = require('express');
const router = express.Router();
// const userController = require('../controllers/user_controller');
const googleStrategy = require('../config/passport-google-oauth20-strategy');
const passport = require('passport');


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', {
        failureMessage: true,
        failureRedirect: process.env.CLIENT_URL,
        successRedirect: process.env.CLIENT_URL,

    }));


module.exports = router;