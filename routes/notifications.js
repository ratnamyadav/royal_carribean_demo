const express = require('express');
const router = express.Router();
const urllib = require('urllib');
const Notification = require('../models/notification');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    Notification.find()
        .exec()
        .then(docs => {
            res.render('notifications/index', { notifications: docs });
            console.log(docs);
        })
        .catch(err => {
            req.flash('error', 'Something went wrong.');
            res.redirect('/');
        });

});

router.get('/new', function(req, res, next) {
    User.find()
        .exec()
        .then(docs => {
            res.render('notifications/new', { users: docs });
        })
        .catch(err => {
            req.flash('error', 'Something went wrong.');
            res.redirect('/notifications');
        });
});

router.post('/', function(req, res, next) {
    const url = 'http://192.168.0.100/push';
    req.check('recipientsIds', 'Recipients is required').not().isEmpty();
    req.check('message', 'Message is required').not().isEmpty();
    const errors = req.validationErrors();
    if(errors) {
        req.flash('error', 'Something went wrong.');
        User.find()
            .exec()
            .then(docs => {
                res.render('notifications/new', { users: docs, errors: errors });
            })
            .catch(err => {
                res.redirect('/notifications');
            });
    } else {
        User.find({_id: req.body.recipientsIds})
            .exec()
            .then(docs => {
                const message = "<SpectralinkIPPhone><Data priority='critical'><h2>" + req.body.message + "</h2></Data></SpectralinkIPPhone>"
                for (var i = 0; i < docs.length; i++) {
                    var options = {
                        method: 'POST',
                        headers: {'Cache-Control': 'No-cache', 'Content-type': 'text/html'},
                        digestAuth: docs[i].username + ':' + docs[i].password,
                        data: message,
                        contentType: 'application/x-www-form-urlencoded'
                    };
                    urllib.request(url, options, function (data) {
                        console.log(data);
                    });
                    const newNotification = new Notification({
                        recipientsIds: req.body.recipientsIds,
                        message: req.body.message
                    });
                    newNotification.save().then(result => {
                        res.redirect('/notifications');
                    }, err => {
                        res.redirect('/notifications');
                    });
                }
            }, err => {
                req.flash('error', 'Something went wrong.');
                res.redirect('/notifications');
            });
    }
});

module.exports = router;
