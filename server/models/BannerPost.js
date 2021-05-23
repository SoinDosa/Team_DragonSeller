const mongoose = require('mongoose');

const bannerPostSchema = mongoose.Schema({
    title: {
        type : String,
        maxlength : 50,
        required: true
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
        expires : '10s',
        default : Date.now
    }
})

const BannerPost = mongoose.model('BannerPost', bannerPostSchema)

module.exports = { BannerPost }