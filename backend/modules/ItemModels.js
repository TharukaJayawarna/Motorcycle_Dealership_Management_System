const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    Image: {
        type: String,
        required: true,
    },

    Item_ID: {
        type: String,
        required: true,
    },

    Item_Name: {
        type: String,
        required: true,
    },

    Price: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return !isNaN(parseFloat(value));
            },
            message: "Price must be a valid number",
        },
    },

    Manufacturer: {
        type: String,
        required: true,
    },

    Category: {
        type: String,
        required: true,
    },

    Compatible_Motorcycle_Models: {
        type: String,
        required: true,
    },

    Received: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return !isNaN(parseInt(value)) && value > 0;
            },
            message: "Received quantity must be a valid number greater than zero",
        },
    },

    In_Stock: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("ItemModels", itemSchema);
