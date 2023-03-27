const express = require('express');
const fs = require('fs');
const https = require('https');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded({ extended: true }));


// Parsing the Body
app.use(bodyParser.json());

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