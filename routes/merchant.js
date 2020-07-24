const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController');
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
    req.merchantImageUrl = filename
    cb(null, filename);
  }
})
const upload = multer({ storage: storage })

const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');

router.post('/signup', merchantController.register);

router.post('/login', merchantController.login);

router.post('/edit', [authenticate, upload.single('merchantImageUrl')], merchantController.editMerchant);

router.get('/logout', [authenticate], merchantController.logout);

router.get('/test-auth', [authenticate], (req, res) => {
  res.send(req.merchant)
})

module.exports = router