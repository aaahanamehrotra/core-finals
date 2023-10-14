const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.render("products", { data: products });
  } catch (err) {
    res.status(500).json(err);
  }
});

const buying = async (product_id) => {
  const product = await Product.findById(product_id);
  const stock = product.stock;
  if (stock === 0) {
    return 0;
  }
  const updated = await Product.updateOne(
    { _id: product_id },
    { $set: { stock: stock - 1 } }
  );
};

router.post("/", async (req, res) => {
  try {
    const out_of_stock = await buying(req.body.id);
    if (out_of_stock === 0) {
      res.redirect("/outofstock");
      return;
    }
    res.redirect("/checkout");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("product", { data: product });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
