const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength : 30
    },
    price: {
        type: Number,
        default: 0
    },
})

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = { Coupon }