var express = require('express');
var router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const { loyaltyPrograms } = require('../db/models/loyaltyProgram')




router.get('/create', authenticate, function (req, res, next) {
  res.render('loyaltyPrograms/loyalty-create', { title: 'Pointy' });
});



router.get('/list', authenticate, async (req, res, next) => {
  const loyaltyProgram= await loyaltyPrograms.find({ merchant: req.merchant })
  //console.log(loyaltyProgram)
  res.render('loyaltyPrograms/loyalty-list',{title:'Pointy',loyaltyPrograms:loyaltyProgram})
})

//show route
router.get('/list/:id',authenticate,async(req,res)=>{
const program= await loyaltyPrograms.find({_id:req.params.id,merchant:req.merchant})
const programValidUntil = new Date(program[0].createdAt + program[0].numOfValidDays * 1000 * 60 * 60 * 24)
res.render('loyaltyPrograms/show',{title:'Pointy',loyaltyPrograms:program,programValidUntil:programValidUntil})
})


module.exports = router;
