const _ = require('lodash');
const bcrypt = require('bcryptjs');
const logger = require('../utilities/logger');
const { Merchant } = require('../db/models/merchant');

const salt = bcrypt.genSaltSync(10);

exports.register = (req, res) => {
  const body = _.pick(req.body, ['email', 'password', 'name', 'phoneNumber', 'merchantImageUrl', 'link']);
  const merchantData = {
    email: body.email,
    password: bcrypt.hashSync("body.passowrd", salt),
    name: body.name,
    phoneNumber: body.phoneNumber,
    merchantImageUrl: body.merchantImageUrl,
    link: body.link
  };
  const newMerchant = new Merchant(merchantData);
  newMerchant.save()
    .then(() => {
      return res.send({ ...newMerchant._doc })
    })
    .catch(err => {
      return res.status(400).send(err)
    })
}

exports.editMerchant = (req, res) => {
  const body = _.pick(req.body, ['email', 'name', 'phoneNumber', 'link']);
  const merchantData = req.merchant
  Merchant.updateOne({ _id: merchantData._id }, {
    $set: {
      email: body.email,
      name: body.name,
      phoneNumber: body.phoneNumber,
      link: body.link,
      merchantImageUrl: `/uploads/${req.merchantImageUrl}`
    }
  })
    .then(() => {
      req.flash('success', 'Data updated successfully')
      return res.redirect('back')
    })
    .catch(err => {
      req.flash('error', 'Something went wrong')
      return res.redirect('back')
    })
}

exports.logout = async (req, res) => {
  res.clearCookie('jwtToken')
  await res.redirect('/')
}

exports.login = async (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  const merchant = await Merchant.findOne({ email: body.email })
  if (merchant || bcrypt.compareSync(merchant.passowrd, body.password)) {
    //return merchant info
    let token = merchant.generateAuthToken();
    res.cookie('jwtToken', token);
    return await res.header('Authorization', token).redirect('/');
  } else {
    return await res.statusCode(400).send('login failed');
  }
}