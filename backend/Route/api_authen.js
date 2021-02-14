const express = require("express");
const router = express.Router();
const user = require("./../models/user");
const bcrypt = require("bcryptjs");
const constants = require("./../constant");

const formidable = require("formidable");

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let result = await user.findOne({ where: { username: username } });
  if (result != null) {
    if (bcrypt.compareSync(password, result.password)) {
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    } else {
      res.json({ result: constants.kResultNok, message: "Incorrect password" });
    }
  } else {
    res.json({ result: constants.kResultNok, message: "Incorrect username" });
  }
});

router.post("/register", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    let result = await user.create(req.body);
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

// Query all users
router.get("/user", async (req, res) => {
  let result = await user.findAll();
  res.json(result);
});

// Delete User
router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await user.findOne({ where: { id: id } });
    result = await user.destroy({ where: { id: id } });
    res.json({ result: constant.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constant.kResultNok, message: "Internal Error" });
  }
});

// Get User By Id
router.get("/user/:id", async (req, res) => {
  let result = await user.findOne({ where: { id: req.params.id } });
  if (result) {
    res.json(result);
  } else {
    res.json({});
  }
});

// Update User
router.put("/user", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    let result = await user.update(req.body, { where: { id: req.body.id } });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

module.exports = router;
