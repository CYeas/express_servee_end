let express = require('express');
let mid = require('./../mid/middle_ware');

let router = express.Router();

router.use(function(req, res, next) {
    req.something = 'hhhhhh';
    next();
})

router.get('/', mid.getIndex(req, res, next));

module.exports = router;
