var express = require('express');
var router = express.Router();

const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');

/* GET widgets pages. */

router.get('/error-400', authenticate, function (req, res, next) {
    res.render('errors/400', { title: 'Endless - Premium Node Js Admin Template' });
});

router.get('/error-401', authenticate, function (req, res, next) {
    res.render('errors/401', { title: 'Endless - Premium Node Js Admin Template' });
});
router.get('/error-403', authenticate, function (req, res, next) {
    res.render('errors/403', { title: 'Endless - Premium Node Js Admin Template' });
});
router.get('/error-404', authenticate, function (req, res, next) {
    res.render('errors/404', { title: 'Endless - Premium Node Js Admin Template' });
});
router.get('/error-500', authenticate, function (req, res, next) {
    res.render('errors/500', { title: 'Endless - Premium Node Js Admin Template' });
});
router.get('/error-503', authenticate, function (req, res, next) {
    res.render('errors/503', { title: 'Endless - Premium Node Js Admin Template' });
});

module.exports = router;
