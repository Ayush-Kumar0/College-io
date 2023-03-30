const fs = require('fs');
const dotenv = require('dotenv').config();

// Server related
const express = require('express');
const https = require('https');
const app = express();

// Body parsing
const bodyParser = require('body-parser');

// Database
const mongoose = require('mongoose');
const db = require('./config/mongoose');

// Authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const mongoStore = require('connect-mongo');


/*====================================================================================================================================*/


// Parsing the Body {application/json  and  application/x-www-form-urlencoded}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Using express-session
app.use(session({
    name: 'session',
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    },
    store: new mongoStore(
        {
            client: mongoose.connection.getClient(),
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || `Session cookie stored in db using mongoStore`);
        })
}));

// Passport functions
app.use(passport.initialize());
app.use(passport.session());


// Getting routes
app.use('/', require('./routes'));


// Listening to the HTTPs server
const port = process.env.PORT;
if (process.env.KEY_PATH && process.env.CERT_PATH) {
    const key = fs.readFileSync(process.env.KEY_PATH);
    const cert = fs.readFileSync(process.env.CERT_PATH);
    const serverHTTPS = https.createServer({ key: key, cert: cert }, app);

    serverHTTPS.listen(port, function (err) {
        if (err) {
            return console.log(`Error while connecting to HTTPs server on port : ${port}`);
        }
        console.log(`HTTPs Server running on port : ${port}`, `https://localhost:${port}/`);
    });
}