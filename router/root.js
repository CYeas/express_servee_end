let express = require('express');

let router = express.Router();

router.use(function(req, res, next) {
    req.something = 'hhhhhh';
    next();
})

router.get('/', function(req, res) {
    res.send('hello,world' + req.something);
})

module.exports = router;
