const mongoose = require('mongoose');

var d = new Date(Date.now())
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
        default: d.toString()
    }
}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment }