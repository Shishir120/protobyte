const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference the User collection
        required: true,
    },
    product: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("orders", orderSchema);