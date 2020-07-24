const mongoose = require('mongoose');
const _ = require('lodash');

const GiftSchema = new mongoose.Schema({
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Merchant'
  },
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  title_ar: {
    type: String,
    required: true,
    minlength: 2
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  },
  description_ar: {
    type: String,
    required: true,
    minlength: 2
  },
  numOfValidDays: {
    type: Number,
    required: true,
    trim: true
  },
  coverImage: {
    type: String,
    required: false
  },
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // required:true,
      ref: 'Customers'
    }
  ],
  sendDate: {
    type: Date,
    //required: true,
    trim: true
  },
  expirationDate: {
    type: Date,
    //required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'active', 'draft', 'history'],
    default: 'created'
  },
  discount: {
    type: Number,
    required: false,
    trim: true
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
});

GiftSchema.methods.toJSON = function () {
  const Gift = this;
  const GiftObject = Gift.toObject();
  const giftJson = _.pick(GiftObject,
    ['_id',
      'merchant',
      'title',
      'title_ar',
      'description',
      'description_ar',
      'coverImage',
      'status',
      'customers',
      'numOfValidDays',
      'sendDate',
      'expirationDate',
      'createdAt',
      'updatedAt'
    ]);
  return giftJson
}

const Gift = mongoose.model('Gift', GiftSchema);

module.exports = { Gift }