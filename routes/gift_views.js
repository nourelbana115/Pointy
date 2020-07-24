var express = require('express');
var router = express.Router();
const { Gift } = require('../db/models/gift')

const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');

router.get('/create', authenticate, function (req, res, next) {
  res.render('gift/gift-create', { title: 'Create Gift', error: req.flash('error') });
});

router.get('/', authenticate, async (req, res, next) => {
  const gifts = await Gift.find({ merchant: req.merchant })
  res.render('gift/gift-list', { title: 'Gift List', gifts: gifts });
});

router.get('/list/:id', authenticate, async (req, res) => {
  const gift = await Gift.findOne({ _id: req.params.id, merchant: req.merchant })
  const giftValidUntil = new Date(gift.createdAt + gift.numOfValidDays * 1000 * 60 * 60 * 24)
  res.render('gift/show', { title: gift.title, gift: gift, giftValidUntil: giftValidUntil })
})



module.exports = router;
