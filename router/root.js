let express = require('express');
let mid = new require('./../mid/middle_ware')();

let router = express.Router();

router.use(function(req, res, next) {
    req.something = 'hhhhhh';
    next();
})

router.get('/', function(req, res, next) {
  console.log(mid);
  mid.getIndex(req, res, next);
});

module.exports = router;
