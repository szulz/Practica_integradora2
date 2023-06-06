const mongoose = require('mongoose');

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
    cart: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
            },
        ],
        default: []
    }
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartsModel