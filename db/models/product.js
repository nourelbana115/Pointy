const mongoose = require('mongoose');
const _ = require('lodash');
const productSchema = new mongoose.Schema({
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
    imageUrl: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    stock:{
        type:String,
        required:true,
        enum:["in stock","low stock","out of stock"]
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

productSchema.methods.toJson = () => {
    const product = this;
    const productObject = product.toObject();
    const productJson = _.pick(productObject, ['_id', 'merchant', 'title', 'title_ar',
        'description', 'description_ar', 'imageUrl', 'price', 'amount', 'createdAt', 'updatedAt','stock'
    ])
    return productJson;
}
const product = mongoose.model('product', productSchema)
module.exports = { product }