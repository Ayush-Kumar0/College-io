const express = require('express');
const router = express.Router();
const fetchCollegeNames = require('../controllers/fetchCollegeNames');

router.get('/', fetchCollegeNames.getNames);


module.exports = router;