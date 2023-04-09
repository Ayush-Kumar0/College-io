const fs = require('fs');
const dotenv = require('dotenv').config();

// Server related
const express = require('express');
const https = require('https');
const app = express();

// Body parsing
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Database
const mongoose = require('mongoose');
const db = require('./config/mongoose');

// Cors
const cors = require('cors');


/*====================================================================================================================================*/


// Parsing the Body {application/json  and  application/x-www-form-urlencoded}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// Allowing cors
app.use(cors());
// {
//     origin: '*',
//     methods: '*',
//     credentials: true,
//     allowedHeaders: '*',
//     exposedHeaders: '*'
// }


// Getting routes
app.use('/', require('./routes'));


// Listening to the HTTPs server
const port = process.env.PORT || 8000;
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