const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');
const productController = require('../controllers/productController');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    var filename = req.merchant.name + '-' + file.fieldname + '-' + Date.now();
    switch (file.mimetype) {
      case 'image/png':
        filename = filename + ".png";
        break;
      case 'image/jpeg':
        filename = filename + ".jpeg";
        break;
      default:
        break;
    }
    req.imageUrl = filename
    cb(null, filename);
  }
})
const upload = multer({ storage: storage })


//add product 
router.post('/add', [authenticate, checkStatus,upload.single('imageUrl')], productController.addProduct)
    //list all products
router.get('/list', [authenticate, checkStatus], productController.getList)
    //delete product
router.post('/delete', [authenticate, checkStatus], productController.deleteProduct)
router.post('/edit/:id',[authenticate,checkStatus],productController.editProduct)
module.exports = router;