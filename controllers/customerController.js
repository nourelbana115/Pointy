const _ = require('lodash');
const { Customer } = require('../db/models/customer');
const logger = require('../utilities/logger');
const { generalResponse } = require('../utilities/responseBody');
const customerServices = require('../services/backendServices/customerServices');

exports.createCustomer = async (req, res) => {
  try {
    const body = _.pick(req.body, ['name', 'email', 'phoneNumber', 'points', 'visits', 'birthday', 'gender']);
    const customerData = {
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      points: body.points,
      visits: body.visits,
      birthday: body.birthday,
      gender: body.gender,
      merchant: req.merchant
    };
    const newCustomer = new Customer(customerData);;
    const savedCustomer = await newCustomer.save();
    await res.redirect('/customer/list');
  } catch (err) {
    req.flash('error', 'Something went wrong')
    res.redirect('back')
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ merchant: req.merchant });
    await res.send(generalResponse({ customers }, {}, 'Customer List'));
  } catch (err) {
    await res.status(400).send(generalResponse({}, err, 'Customer List'));
  }
};

exports.updateSegments = async (req, res) => {
  const customers = await Customer.find({ merchant: req.merchant });
  const updatedCustomers = await customerServices.updateSegments(customers);
  await res.send(updatedCustomers);
}

exports.getSegmentCustomers = async (req, res) => {
  const segment = req.query.segmentName;
  const merchantData = req.merchant;
  const segmentCustomers = await Customer.find({ merchant: merchantData, segments: segment })
  await res.send(segmentCustomers)
}