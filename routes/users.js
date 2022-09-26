var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')
const verifyLogin = require('../middleware/verify-user')
require('../db/connection')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/index',{style:'style.css'});
});
//Login page
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/gamepage')
  }else{

    res.render('user/user-login',{style:'login.css','loginErr':req.session.loginErr})
    req.session.loginErr = false
  }
})

router.get('/signup',(req,res)=>{
  res.render('user/user-signup',{style:'signup.css'})
})

router.get('/gamepage',(req,res)=>{
  let user = req.session.user
  //Checks the user is logged in or not
  if(req.session.loggedIn){
    res.render('user/game-page',{style:'gamepage.css',user})
  }else{
    res.redirect('/login')
  } 
})
//Getting the user details from signup page
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{

    req.session.loggedIn = true;
    req.session.user = response; //Adding the user to session
    console.log('sign in succesfully');
    res.redirect('/login')  
  }).catch((err)=>{
    console.log(err); 
    res.redirect('/signup')
  })
})
//Login data collection
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    //Checks whether user is valid or not
    if(response){
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/gamepage')
    }
  }).catch((err)=>{
    console.log(err);
    req.session.loginErr = true
    res.redirect('/login') //If user is not valid 
  })
})
//Logout section for user
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/login')
})
//Router which get the details of the logdein user
router.get('/account',(req,res)=>{
  res.render('user/user-account-details',{style:'useraccount.css'})
})
//Word scrambler game
router.get('/wordscrambler',verifyLogin,(req,res)=>{

  res.render('user/word-scrambler',{style:'wordscrambler.css',user:req.session.user})
})
//Sending the score details
router.post('/wordscramblescore',(req,res)=>{
  let user = req.session.user._id;
  // console.log(user);
  userHelpers.wordScrambler(req.body,user).then(()=>{
    console.log();
  })
})

// router.post('/scramble-score',(req,res)=>{
//   console.log(req.body);
// })

module.exports = router;
