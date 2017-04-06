let express = require('express');
let mid = require('./../mid/middle_ware')(config);
let bodyParser = require('body-parser');

let router = express.Router();

router.use(bodyParser.json());

router.get(config.index, function(req, res, next) {
  mid.getIndexPage(req, res, next);
});

router.get(/\/.+/, function(req, res, next) {
  mid.readBlog(req, res, next);
});

router.post(config.index, function(req, res, next) {
  mid.getIndex(req, res, next);
})

module.exports = router;
