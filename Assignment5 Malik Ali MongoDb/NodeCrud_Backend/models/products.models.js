const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name !!"],
  },
  price: {
    type: Number,
    default: 0,
    required: [true, "Enter the price"],
  },
  category: {
    type: String,
    required: [true, "Please enter category of resource !!"],
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
