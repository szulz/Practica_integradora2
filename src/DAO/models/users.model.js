const mongoose = require('mongoose');

const userCollection = 'usuarios'

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
});

const userModel = mongoose.model(userCollection, userSchema);
module.exports = userModel