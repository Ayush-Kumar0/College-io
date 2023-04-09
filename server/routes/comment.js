const express = require('express');
const router = express.Router();
const fetchUser = require('../middlewares/fetchUser');
const commentController = require('../controllers/comment_controller');

// create comment
router.post('/create', fetchUser, commentController.create);


module.exports = router;