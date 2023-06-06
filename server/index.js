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
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));


// Getting routes
app.use('/', require('./routes'));


// Listening to the HTTP server
const port = process.env.PORT || 8000;
const server = app.listen(port, function (err) {
    if (err) {
        return console.log(`Error while connecting to HTTP server on port : ${port}`);
    }
    else
        console.log(`HTTP Server running on port : ${port}`, `http://localhost:${port}/`);
});

// Using Sockets
const io = require('socket.io')(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
        allowedHeaders: ['Cookie']
    }
});
require('./sockets/index')(io);