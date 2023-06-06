const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');


// Signup
router.post('/create', userController.create);
// Signin
router.post('/createSession', userController.createSession);
// Signout
router.get('/logout', userController.logout);

// Verify if user corresponding to token exists in database or not
router.post('/exists', userController.exists);



module.exports = router;