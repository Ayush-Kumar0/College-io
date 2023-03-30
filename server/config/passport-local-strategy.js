const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.use(new localStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        User.findOne({ 'email': email })
            .then((user) => {
                if (!user || user.checkPassword(password) == false) {
                    // req.flash('error', 'Invalid Email/Password');
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch((err) => console.log(`Error while finding the user`));
    }
));


//Serializing the user (which key to keep in cookies)
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//Deserealizing the user from cookies (user identification using id in cookies)
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then((user) => {
            if (!user)
                console.log(`Deserealized User not found`);
            else
                return done(null, user);
        })
        .catch((err) => {
            console.log(`Error in deserealizing the user`);
            return done(err);
        });
});






// Check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // If the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // If the user is not signed in
    return res.json({ 'error': 'You are not authenticated' });
}



module.exports = passport;