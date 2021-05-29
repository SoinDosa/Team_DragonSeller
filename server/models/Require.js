const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requireSchema = new mongoose.Schema({
    title: {
        type : String,
        maxlength : 50,
        required: true
    },
    requirePart: {
        type : Number,
        default: 1
    },
    description: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        expires : '300s',
        default : Date.now
    },
    answer: {
        type : Number,
        default: 1
    },
}, { timestamps: true })



const Require = mongoose.model('Require', requireSchema)

module.exports = { Require }