var express = require('express');
var router = express.Router();

const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');

/* GET home page. */
router.get('/', authenticate, function (req, res, next) {
  res.render('dashboards/default', { title: 'Endless - Premium Node Js Admin Template' });
});

module.exports = router;
