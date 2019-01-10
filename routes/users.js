const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');

const multer = require('multer');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find()
        .exec()
        .then(docs => {
            res.render('users/index', { users: docs });
        })
        .catch(err => {
            req.flash('error', 'Something went wrong.');
            res.redirect('/');
        });
});

router.get('/add', function(req, res, next) {
    res.render('users/add', { title: 'New User' });
});

router.post('/', function(req, res, next) {
    // Form validator
    req.check('name', 'Name field is required').not().isEmpty();
    req.check('username', 'Username is required').not().isEmpty();
    req.check('password', 'Password is required').not().isEmpty();
    req.check('ipAddress', 'IP Address is required').not().isEmpty();

    //Check errors
    var errors = req.validationErrors();
    if(errors) {
        req.flash('error', 'Something went wrong.');
        res.render('users/add', { title: 'New User', errors: errors });
    } else {
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            ipAddress: req.body.ipAddress
        });
        console.log(newUser);
        newUser.save().then(result => {
          console.log(result);
        });
        req.flash('success', 'Added new user.');
        res.redirect('/users');
    }
});

router.get('/destroy/:userId', function(req, res, next) {
    const id = req.params.userId;
    User.remove({ _id: id })
        .exec()
        .then(result => {
            req.flash('success', 'Deleted user.');
            res.redirect('/users');
        })
        .catch( err => {
            req.flash('error', 'Something went wrong.');
            res.redirect('/users');
        });
});

module.exports = router;
