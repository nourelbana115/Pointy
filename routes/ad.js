const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');

router.post('/send', [authenticate, checkStatus], adController.sendEmail);

module.exports = router