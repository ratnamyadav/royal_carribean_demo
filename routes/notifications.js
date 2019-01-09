var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('notifications/index');
});

router.get('/new', function(req, res, next) {
    res.render('notifications/new');
});

module.exports = router;
