const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requireSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 50,
        required: true
    },
    writer: {
        type: String,
        maxlength: 50,
    },
    requirePart: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    answer: {
        type: Number,
        default: 1
    },
    comment: {
        type: String,
        maxlength: 400,
    },
}, { timestamps: true })



const Require = mongoose.model('Require', requireSchema)

module.exports = { Require }