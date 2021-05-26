const mongoose = require('mongoose');

const bannerPostSchema = mongoose.Schema({
    title: {
        type : String,
        maxlength : 50,
        required: true
    },
    bannerPart: {
        type : Number,
        default : 1
    },
    images: {
        type: Array,
        required: true,
        default: []
    },
    contents: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        expires : '600s',
        default : Date.now
    }
})

const BannerPost = mongoose.model('BannerPost', bannerPostSchema)

module.exports = { BannerPost }