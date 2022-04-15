const express = require('express')
const router = express.Router();
const validator = require('validator')
const User = require('../models/User')
const passport = require('passport')


//--------------------------SINGUP ROUTE BELOW ----------------------------------------

router.post('/register', (req, res, next) => {
    console.log(req.body, req.sessionID, req.session, req.user)
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push('Please enter a valid email address.')
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push( 'Password must be at least 8 characters long')
    if (req.body.password !== req.body.confirmPassword) validationErrors.push('Passwords do not match')
  console.log(validationErrors, 'all the errors')
    if (validationErrors.length) {
        res.send({'errors': validationErrors})
    }
    
    if(validationErrors.length == 0){
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    
    User.findOne({$or: [
      {email: req.body.email},
      {username: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
    //   console.log('the existing', existingUser)
      if (existingUser) {
        user = {}
        console.log('user already there')
        validationErrors.push('User already exists')
        return res.send({'errors': validationErrors})
      }
    //   console.log(user, 'before saving user')
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.send({'in': 'Account created successfully', 'user': req.user})
        })
      })
    })
    }
  })


//-----------------------------SIGN IN ROUTE BELOW---------------------//

router.post('/login', (req, res, next) => {
    console.log(req.session, req.user)
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push('Please enter a valid email address.')
    if (validator.isEmpty(req.body.password)) validationErrors.push('Password cannot be blank.')
    
    console.log(validationErrors.length, validationErrors)
  
    if (validationErrors.length) {
        return res.send({'errors': validationErrors})
    }

    if(validationErrors.length == 0){
    console.log('in here')
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        console.log(info)
        validationErrors.push('Wrong username or password')
        return res.send({'errors': validationErrors})
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        res.send({'in': 'Logged In', 'user' : req.user})
      })
    })(req, res, next)
    }
  })

//------------------------------LOG OUT ----------------------------------
router.post('/logout', (req, res) =>{
    req.logout()
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.send('logged out')
    })
})





// router.post('/getuser', (req,res) =>{
//     console.log(req)
//     res.send('ok tried')
// })


module.exports = router;


