const express = require("express");
const product = require("./../models/product");
const router = express.Router();
const Sequelize = require("sequelize");

router.get("/product", async (req, res) => {
  let result = await product.findAll({ order: Sequelize.literal("id DESC") });
  res.json(result);
});

module.exports = router;
