const express = require('express');
const router = express.Router();
const { Email } = require('../db/models/email')

const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');

router.get('/emails', [authenticate, checkStatus], async (req, res, next) => {
  const merchant = req.merchant;;
  const emails = await Email.find({ merchant: req.merchant })
  await res.render('ad/emails', { title: 'Pointy', merchant: merchant, emails: emails, error: req.flash('error'), success: req.flash('success') });
});

module.exports = router