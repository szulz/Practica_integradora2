const { Schema, model } = require("mongoose");

const schema = new Schema({
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100, unique: true },
});

const UserModel = model("users", schema);
module.exports = UserModel;
