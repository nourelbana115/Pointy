const mongoose = require('mongoose');
const _ = require('lodash');

const loyaltyProgramsSchema = new mongoose.Schema({
	merchant: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Merchant"
	},
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 2
	},
	title_ar: {
		type: String,
		required: true,
		trim: true,
		minlength: 2
	},
	description: {
		type: String,
		required: true,
		trim: true,
		minlength: 2
	},
	description_ar: {
		type: String,
		required: true,
		trim: true,
		minlength: 2
	},
	numOfValidDays: {
		type: Number,
		required: true,
		trim: true
	},
	 loyaltyType: {
		type: Number,
		enum:[1,2],
		required: true,
		
	},
	coverImageUrl: {
		type: String,
		required: false,
	},
	imageUrl: {
		type: Array,
		required: false
	},
	activationDate: {
		type: Date,
		required: false,
		trim: true
	},
	pointValue: {
		type: Number,
		required: false,
		trim: true
	},
	status: {
		type: String,
		enum: ['active', 'draft'],
		required: true,
	},
	min: {
		type: Number,
		required: false,
		trim: true
	},
	avg: {
		type: Number,
		required: false,
		trim: true
	},
	max: {
		type: Number,
		required: false,
		trim: true
	},
	minVisits: {
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
})

loyaltyProgramsSchema.methods.toJson = () => {
	const loyaltyPrograms = this;
	const loyaltyProgramsObiect = loyaltyPrograms.toObject()
	const loyaltyProgramsJson = _.pick(loyaltyProgramsObiect, ['_id', 'merchant', 'title', 'title_ar',
		'description', 'description_ar', 'numOfValidDays', 'type', 'coverImageUrl', 'imageUrl', 'createdAt',
		'updatedAt', 'activationDate', 'pointValue', 'status','min','max','avg','minVisits'])
	return loyaltyProgramsJson;
}

const loyaltyPrograms = mongoose.model('loyaltyPrograms', loyaltyProgramsSchema);

module.exports = { loyaltyPrograms }