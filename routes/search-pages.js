var express = require('express');
var router = express.Router();
const { loyaltyPrograms } = require('../db/models/loyaltyProgram')
const { product } = require('../db/models/product')
const { Gift } = require('../db/models/gift')
const { Customer } = require('../db/models/customer')
const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');


router.get('/search', authenticate, async (req, res, next) => {
    const components = [loyaltyPrograms, product, Gift, Customer];
    const search = []
    const models = []
    for (component of components) {
        const moduleName = component.collection.collectionName.substring(0, component.collection.collectionName.length - 1);
        const regex = new RegExp(escapeRegex(req.query.term), 'gi');
        const result = await component.find({ merchant: req.merchant, $or: [{ title: regex }, { title_ar: regex }, { name: regex }, { description: regex }, { description_ar: regex }] })
        if (result.length) {
            search.push(result)
            models.push(moduleName)
        }
        if ((ignoreSpace(req.query.term).includes(moduleName) || moduleName.includes(ignoreSpace(req.query.term))) && !models.includes(moduleName)) {

            models.push(moduleName)
        }

    }
    console.log(search)

    res.render('search-pages/search', { title: 'Pointy', searchItems: search, models: models, term: req.query.term });
});

function escapeRegex(text) {
    return text.replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "\\$&")
};
function ignoreSpace(text) {
    return text.replace(/\s/g, "");
}


module.exports = router;
