const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const { checkStatus } = require('../middleware/checkStatus');
const loyaltyProgramController = require('../controllers/loyaltyProgramController');
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
    req.coverImageUrl = filename
    cb(null, filename);
  }
})
const upload = multer({ storage: storage })


//Add loyalty program
router.post('/add', [authenticate,checkStatus ,upload.single('coverImageUrl')], loyaltyProgramController.addLoyaltyProgram);
//List all loyalty programs
router.get('/list', [authenticate,checkStatus], loyaltyProgramController.getList);
//delete loyalty program
router.post('/delete/:id', [authenticate, checkStatus], loyaltyProgramController.deleteLoyaltyProgram);
//Activate loyalty program
router.post('/activate/:id', [authenticate, checkStatus], loyaltyProgramController.activateLoyaltyProgram);
//Deactivate loyalty program
router.post('/deActivate/:id', [authenticate,checkStatus], loyaltyProgramController.deActivateLoyaltyProgram);

module.exports = router;