const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: [true, 'Please add username']
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: [true, 'Please add email']
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
//custom method to generate authTok

module.exports = mongoose.model('User', UserSchema);