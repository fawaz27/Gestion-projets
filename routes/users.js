const express = require('express')
const { session } = require('passport')
const router = express.Router()
const passport = require('passport')

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        req.flash('message', 'Your are already logged in.')
        res.redirect('/partners/profile')
    } else {
        
        res.render('pages/login', {
            title: 'Login',
            user: req.user,
            message: res.locals.message
        })
    }
})


router.post('/login', (req, res, next) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        req.flash('message', 'You are already logged in.')
        res.redirect('/partners/profile')
    } else {
        let user = (req.body.username).toLowerCase()
        let pass = req.body.password
        if (user.length === 0 || pass.length === 0) {
            req.flash('message', 'You must provide a username and password.')
            res.redirect('/partners/login')
        } else {
            next()
        }
    }
}, passport.authenticate('login', {
    successRedirect : '/',
    failureRedirect : '/partners/login',
    failureFlash : true,
    session :true
    
}))

/*
router.post('/login',
  passport.authenticate('login', { failureRedirect: '/partners/login', failureMessage: true ,session: true}),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  });
*/

router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/partners/profile')
    } else {
        res.render('pages/signup', {
            title: 'Register',
            user: req.user,
            message: res.locals.message
        })
    }
})
router.post('/register', (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash('message', 'You are already logged in.')
        res.redirect('/partners/profile')
    } else {
        let user = (req.body.username).toLowerCase()
        let pass = req.body.password
        let passConf = req.body.repassword
        if (user.length === 0 || pass.length === 0 || passConf.length === 0) {
            req.flash('message', 'You must provide a username, password, and password confirmation.')
            res.redirect('/partners/register')
        } else if (pass != passConf) {
            req.flash('message', 'Your password and password confirmation must match.')
            res.redirect('/partners/register')
        } else {
            next()
        }
    }
}, passport.authenticate('register', {
    successRedirect : '/',
    failureRedirect : '/partners/register',
    failureFlash : true
}))


module.exports=router;