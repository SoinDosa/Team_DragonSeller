const mongoose = require('mongoose');

const bannerPostSchema = mongoose.Schema({
    title: {
        type : String,
        maxlength : 50,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default : Date.now
    }
})

const BannerPost = mongoose.model('BannerPost', bannerPostSchema)

module.exports = { BannerPost }