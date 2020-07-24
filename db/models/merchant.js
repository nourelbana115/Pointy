const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const MerchantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 2,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlenght: 1,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  password: {
    type: String,
    required: true
  },
  merchantImageUrl: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: false,
    trim: true
  },
  status: {
    type: String,
    required: true,
    trim: true,
    enum: ['active', 'inactive'],
    default: 'inactive'
  }
})

MerchantSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject, ['_id', 'name', 'email', 'merchantImageUrl', 'phoneNumber', 'link', 'status']);
}

MerchantSchema.methods.generateAuthToken = function () {
  const merchant = this;
  const access = 'merchantEmail';
  const token = jwt.sign({ email: (merchant.email), access }, process.env.JWT_SECRET).toString();
  return token
}

MerchantSchema.statics.findByToken = function (token) {
  const Merchant = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return Promise.reject();
  }
  if (decoded.access === 'merchantEmail') {
    return Merchant.findOne({
      email: decoded.email
    });
  } else {
    return Promise.reject();
  }
}

const Merchant = mongoose.model('Merchant', MerchantSchema);

module.exports = { Merchant }