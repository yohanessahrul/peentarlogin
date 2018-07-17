const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    age: Number,
    email: String,
    phone: String,
    password: String,
}, {
    timestamps: true,
})

const User = mongoose.model('User', schema);

module.exports = User;