const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  cost: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
