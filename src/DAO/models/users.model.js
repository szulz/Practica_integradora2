const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100, unique: true },
    password: { type: String, required: true, max: 100 },
    isAdmin: { type: Boolean, required: true, default: false },
});

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(userCollection, userSchema);
module.exports = userModel;