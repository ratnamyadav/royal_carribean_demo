const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator/check');

const multer = require('multer');
const upload = multer({ destination: './uploads/users/profile' });

// Passport LOGIN
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy(function (email, password, done) {
    User.getUserByEmail(email, function(err, user) {
        if(err) throw err;
        if(!user) {
            return done(null, false, { message: 'Unknown User' });
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
           if(err) return done(err);
           if(isMatch) {
               return done(null, user);
           } else {
               return done(null, false, { message: 'Invalid password' })
           }
        });
    });
}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
    res.render('users/register', { title: 'Register' });
});

router.post('/register', upload.single('profileImage'), function(req, res, next) {
    if(req.file) {
      var profileImage = req.file.filename;
    } {
        var profileImage = 'noimage.jpg';
    }
    // Form validator
    req.check('name', 'Name field is required').not().isEmpty();
    req.check('email', 'Email is not valid').isEmail();
    req.check('password', 'Password is required').not().isEmpty();
    req.check('passwordConfirmation', 'Passwords not match').not().equals(req.body.password);

    //Check errors
    var errors = req.validationErrors();
    if(errors) {
      console.log(errors);
      req.flash('error', 'Something went wrong.');
      res.render('users/register', { title: 'Register', errors: errors });
    } else {
      const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          profileImage: profileImage
      });

      User.createUser(newUser, function(err, user) {
        if(err) throw err;
        console.log(user);
      });
      req.flash('success', 'You are now registered.');
      res.location('/');
      res.redirect('/');
    }
});

router.get('/login', function(req, res, next) {
    res.render('users/login', { title: 'Login' });
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: 'Invalid email or passowrd' }),
    function(req, res) {
        req.flash('success', 'You are logged in');
        res.redirect('/');
    });

module.exports = router;
