const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.json({ result: "login" });
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  user.create();
  res.json({ result: username, password });
});

module.exports = router;
