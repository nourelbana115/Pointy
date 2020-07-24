const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');

const CustomerSchema = new mongoose.Schema({
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Merchant'
  },
  segments: [String],
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  phoneNumber: {
    type: String,
    required: false,
    minlength: 2,
    trim: true
  },
  points: {
    type: Number,
    required: true,
    trim: true,
    default: 0
  },
  visits: {
    type: Number,
    required: true,
    trim: true,
    default: 0
  },
  birthday: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

CustomerSchema.methods.toJSON = function () {
  let Customer = this;
  let CustomerObject = Customer.toObject();
  return _.pick(CustomerObject, ['_id', 'merchant',
    'segments', 'name', 'email', 'phoneNumber', 'points', 'visits', 'birthday', 'gender', 'createdAt', 'updatedAt']);
}

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = { Customer }