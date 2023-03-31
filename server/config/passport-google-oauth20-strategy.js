const bcrypt = require('bcrypt');
const User = require('../models/user');
const googleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken);

    // TODO: check if gsuite education edition

    // Saving the user into database
    await saveUser(profile, done);
}));



//Serializing the user (which key to keep in cookies)
passport.serializeUser(function (user, done) {
    console.log(`User serealized`);
    done(null, user.id);
});

//Deserealizing the user from cookies (user identification using id in cookies)
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then((user) => {
            if (!user)
                console.log(`Deserealized User not found`);
            else
                console.log(`Deserealized user found`);
            return done(null, user);
        })
        .catch(err => {
            console.log('Error in deserealizing the user');
            return done(err);
        })
});







// To save user into database or fetch if it is already present
async function saveUser(profile, done) {
    User.findOne({ email: profile.emails[0].value })
        .then(async (user) => {
            if (user) {
                // If found, set this user as req.user
                console.log(`Google user found`);
                return done(null, user);
            }
            else {
                // If not found, create the user and set it as req.user
                let newUser = new User();
                newUser.email = profile.emails[0].value;
                const email = newUser.email;
                newUser.name = profile.displayName;
                newUser.username = email.substring(0, email.indexOf('@'));
                await newUser.setPassword(await bcrypt.genSalt(10));

                newUser.save()
                    .then((user) => {
                        console.log(`Google user created`);
                        return done(null, user);
                    })
                    .catch((err) => {
                        console.log('Error while creating user after google auth : ', err);
                        return done(err);
                    });
            }
        })
        .catch((err) => {
            console.log('Error while finding the profile: ', err);
            return done(err);
        });
}

module.exports = passport;