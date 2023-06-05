const mongoose = require('mongoose');

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true, max: 99999999 },
});

const productModel = mongoose.model(productCollection, productSchema);
module.exports = productModel