const mongoose = require('mongoose');
const paymentSchema = mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    },
    buytime: {
        type: String,
        default: Date.now
    },
    delivery: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment }