const express = require('express');
const router = express.Router();


// Homepage
router.get('/', (req, res) => {
    res.send('Homepage');
});


// Authenitcation route
router.use('/auth', require('./auth'));


module.exports = router;