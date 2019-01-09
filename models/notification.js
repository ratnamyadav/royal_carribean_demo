const mongoose = require('mongoose');

// User schema
const NotificationSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);