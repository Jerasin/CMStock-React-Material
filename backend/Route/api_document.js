const express = require("express");
const router = express.Router();
const borrow = require("./../models/borrow");

router.get("/borrow", (req, res) => {
  res.send("GGEZS");
});

module.exports = router;
