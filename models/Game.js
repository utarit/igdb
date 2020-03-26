const mongoose = require('mongoose');


const GameSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: [true, 'Please add a game content']
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title']
    },
    ingredients: {
        type: String,
        trim: true,
        required: false
    },
    rate:{
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', GameSchema);