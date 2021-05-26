const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    writer: {
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type : String,
        maxlength : 50
    },
    //computerPart 추가함.
    computerPart: {
        type : Number,
        default: 1
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    comment: {
        type: Array,
        default: []
    },
}, { timestamps: true })

productSchema.index({
    title:'text',
    description: 'text',   
},{
    weights: {
        title: 5,
        description: 1,
    }
})

const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching')

productSchema.plugin(mongoose_fuzzy_searching,{fields: ['title', 'description']});
const Product = mongoose.model('Product', productSchema)

module.exports = { Product }