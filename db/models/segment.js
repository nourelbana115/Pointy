const mongoose = require('mongoose');
const _ = require('lodash');

const SegmentSchema = new mongoose.Schema({
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Merchant'
  },
  segmentType: {
    type: String,
    required: true,
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
})

SegmentSchema.methods.toJSON = function () {
  let Segment = this;
  let SegmentObject = Segment.toObject();
  return _.pick(SegmentObject, ['_id', 'segmentType', 'updatedAt', 'createdAt']);
}

const Segment = mongoose.model('Segment', SegmentSchema);

module.exports = Segment