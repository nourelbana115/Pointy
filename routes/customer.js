const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');

router.post('/create', [authenticate, checkStatus], customerController.createCustomer);

router.get('/list', [authenticate, checkStatus], customerController.getCustomers);

router.get('/segment', [authenticate, checkStatus], customerController.getSegmentCustomers);

router.get('/update', [authenticate, checkStatus], customerController.updateSegments);

module.exports = router