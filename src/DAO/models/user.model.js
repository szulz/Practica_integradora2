const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const user_Collection = 'user.v1'

const user_Schema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 100 },
    last_name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100, unique: true },
    age: { type: Number, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    cart: { type: [mongoose.Schema.Types.ObjectId], ref: 'carts', default: [] },
    role: { type: String, required: true, max: 100, default: 'user' },
});

user_Schema.pre('save', function (next) {
    this.populate('cart');
    next();
});


const user_Model = mongoose.model(user_Collection, user_Schema);
module.exports = user_Model;