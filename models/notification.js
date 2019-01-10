const mongoose = require('mongoose');
const UserSchema = require('./user');

// User schema
const NotificationSchema = mongoose.Schema({
    recipientsIds: {
        type: [String]
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);