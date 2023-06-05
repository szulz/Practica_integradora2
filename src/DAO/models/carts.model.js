const mongoose = require('mongoose');

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);
module.exports = cartsModel