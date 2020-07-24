const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController');

const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');

router.get('/edit', [authenticate], (req, res) => {
  const merchant = req.merchant;;
  res.render('merchant/edit-merchant', {title: 'Pointy', merchant: merchant, error: req.flash('error')})
})

module.exports = router