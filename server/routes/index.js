const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.body);
    res.send('This is the message sent from server to client.');
});


module.exports = router;