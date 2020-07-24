const _ = require('lodash');
const express = require('express');
const app = express();
const { generalResponse } = require('../utilities/responseBody');
const { product } = require('../db/models/product');
const logger = require('../utilities/logger');

exports.addProduct = async (req, res) => {
    try {
        const body = _.pick(req.body, ['title', 'title_ar', 'description', 'description_ar',
            'imageUrl', 'amount', 'price','stock'
        ]);
        const productData = {
            merchant: req.merchant,
            title: body.title,
            title_ar: body.title_ar,
            description: body.description,
            description_ar: body.description_ar,
            imageUrl: req.imageUrl,
            amount: body.amount,
            price: body.price,
            stock:body.stock
        };
        const newProduct = new product(productData);
        const savedProduct = await newProduct.save();
       // return await res.send(generalResponse({ ...savedProduct._doc }, {}, 'product creation'));
       res.redirect('/product/list')
    } catch (err) {
        await res.status(400).send(generalResponse({}, err, 'product creation'));
    }
}

exports.getList = async (req, res) => {
    try {
        const foundProduct = await product.find({ merchant: req.merchant });
        await res.send(generalResponse({ foundProduct }, {}, "Product list"));
    } catch (err) {
        await res.send(generalResponse({}, err, "Product list"));
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await product.findOneAndDelete({ merchant: req.merchant._id, _id: req.body._id })
       // await res.send(generalResponse({ "deleted product": deletedProduct }, {}, "delete product "))
       await res.redirect('/product/list')
    } catch (err) {
        res.status(400).send(generalResponse({}, err, "delete product"))
    }
}
exports.editProduct = async (req, res) => {
    try {
        const body = _.pick(req.body, ['title', 'title_ar', 'description', 'description_ar',
            'imageUrl', 'amount', 'price','stock'
        ]);
        const newData = {
            merchant: req.merchant,
            title: body.title,
            title_ar: body.title_ar,
            description: body.description,
            description_ar: body.description_ar,
            imageUrl: body.imageUrl,
            amount: body.amount,
            price: body.price,
            stock:body.stock
        }
       // const foundProduct = await product.find({ merchant: req.merchant._id, _id: req.params.id })
       const updatedProduct=await product.updateMany({merchant:req.merchant._id,_id:req.params.id},newData)
     //  await res.send(generalResponse({updatedProduct},{},"edit product"))
     res.redirect('/product/list')
    }
    catch (err) {
        await res.status(400).send(generalResponse({},err,"edit product"))
    }
}