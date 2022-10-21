var express = require('express');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {

adminHelpers.getAllUsers().then((users)=>{
  res.render('admin/index', {admin:true , users,style:"admin.css"});
})
});

router.get('/adminlogin',(req,res)=>{
res.render('admin/admin-login',{style:"adminlogin.css"})
})

router.post('/adminlogin',(req,res)=>{
// console.log(req.body);
adminHelpers.adminLogin(req.body).then(()=>{
  res.redirect('/admin')
}).catch((err)=>{
  res.redirect('/admin/adminlogin')
})

})

module.exports = router;
