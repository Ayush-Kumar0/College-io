const express = require('express');
const router = express.Router();


// Homepage
router.get('/', (req, res) => {
    res.send('Homepage');
});


// Authenitcation route
router.use('/auth', require('./auth'));

// Get all the available colleges
router.use('/fetchCollegeNames', require('./fetchCollegeNames'));

// Feeds
router.use('/feed', require('./feed'));

// Comment
router.use('/comment', require('./comment'));


module.exports = router;