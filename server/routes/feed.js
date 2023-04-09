const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const feedController = require('../controllers/feed_controller');

// create feed
router.post('/create', fetchUser, feedController.create);


module.exports = router;