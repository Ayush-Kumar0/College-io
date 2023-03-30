const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');


// path='/auth/signup'
router.post('/signup', userController.create);

// path='auth/login'
router.post('/login', passport.authenticate('local', {}), userController.createSession);

// path='auth/logout'
router.get('/logout', userController.destroySession);


module.exports = router;