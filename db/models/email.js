const mongoose = require('mongoose');
const _ = require('lodash');

const EmailSchema = new mongoose.Schema({
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Merchant'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    minlength: 2
  },
  segmentName: {
    type: String,
    required: true
  },
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Customers'
    }
  ],
  sentAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

EmailSchema.methods.toJson = () => {
  const Gift = this;
  const GiftObject = Gift.toObject()
  const EmailJson = _.pick(GiftObject, ['_id', 'merchant', 'title', 'content', 'segmentName', 'customers'])
  return EmailJson;
}

const Email = mongoose.model('Email', EmailSchema);

module.exports = { Email }