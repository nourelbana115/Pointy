var express = require('express');
var router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const { product } = require('../db/models/product')


router.get('/list', authenticate, async (req, res) => {
    const products = await product.find({ merchant: req.merchant._id })
    res.render('product/product-list', { title: "Pointy", products: products })
})
router.get('/edit/:id', authenticate, async (req, res) => {
    const products=await product.find({merchant:req.merchant,_id:req.params.id})
await res.render('product/product-edit',{title:"Pointy",product:products[0]})
})
router.get('/create',authenticate,async(req,res)=>{
    await res.render('product/product-create',{title:"pointy"})
})

module.exports = router;



