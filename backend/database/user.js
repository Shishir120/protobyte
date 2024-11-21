const mongoose = require('mongoose');

let userSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isFarmer: Boolean
})

module.exports = mongoose.model("users", userSchema);