const express = require('express');
const router = express.Router();
const { Customer } = require('../db/models/customer')

const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');

router.get('/', authenticate, async (req, res, next) => {
  const customers = await Customer.find({ merchant: req.merchant })
  return await res.render('customer/customers-list', { title: 'Pointy', customers: customers });
});

router.get('/create', authenticate, async (req, res, next) => {
  return await res.render('customer/customer-create', { title: 'Pointy', error: req.flash('error') });
});

router.get('/segment/:segment', authenticate, async (req, res, next) => {
  const customers = await Customer.find({ merchant: req.merchant, segments: req.params.segment })
  return await res.render('customer/segment-customers', { title: 'Pointy', customers: customers, segment: req.params.segment });
});


module.exports = router;
