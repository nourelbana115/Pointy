var express = require('express');
var router = express.Router();

/* GET widgets pages. */

router.get('/login', function(req, res, next) {
    res.render('authentication/login', { title: 'Endless - Premium Node Js Admin Template' });
});

module.exports = router;
