const _ = require('lodash');
const { Gift } = require('../db/models/gift');
const { Customer } = require('../db/models/customer');
const logger = require('../utilities/logger');
const { generalResponse } = require('../utilities/responseBody');

exports.createGift = async (req, res) => {
  try {
    const body = _.pick(req.body, ['title', 'title_ar', 'description', 'description_ar', 'numOfValidDays', 'coverImageUrl', 'sendDate',
      'expirationDate', 'status', 'segmentName']);
    const segmentName = body.segmentName;
    const customers = await Customer.find({ merchant: req.merchant, segments: segmentName });
    const giftData = {
      title: body.title,
      title_ar: body.title_ar,
      description: body.description,
      description_ar: body.description_ar,
      numOfValidDays: body.numOfValidDays,
      coverImage: req.coverImage,
      sendDate: body.sendDate,
      expirationDate: body.expirationDate,
      status: body.status,
      customers: customers,
      merchant: req.merchant
    };
    const newGift = new Gift(giftData);
    const savedGift = await newGift.save();
    await res.redirect('/gift/list');
  } catch (err) {
    req.flash('error', 'Something went wrong')
    res.redirect('back')
  }
};

exports.getGits = async (req, res) => {
  try {
    const gifts = await Gift.find({});
    await res.send(generalResponse({ gifts }, {}, 'Gift List'));
  } catch (err) {
    console.log(err)
    await res.status(400).send(generalResponse({}, err, 'Gift List'));
  }
}
