const mongoose = require('mongoose');

const messagesCollection = 'messages'

const messagesSchema = new mongoose.Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
});

const messagesModel = mongoose.model(messagesCollection, messagesSchema);
module.exports = messagesModel