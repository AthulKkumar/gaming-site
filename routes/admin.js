var express = require('express');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  adminHelpers.getAllUsers().then((users)=>{
    res.render('admin/index', {admin:true , users});
  })
});

router.get('/login',(req,res)=>{
  console.log(req.body)
  adminHelpers.adminLogin(req.body).then(()=>{

  })
})

module.exports = router;
