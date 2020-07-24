const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');
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
    req.coverImage = filename
    cb(null, filename);
  }
})
const upload = multer({ storage: storage })

const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');

router.post('/create', [authenticate, checkStatus, upload.single('coverImage')], giftController.createGift)

router.get('/list', [authenticate, checkStatus], giftController.getGits)

module.exports = router