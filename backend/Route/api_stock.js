const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");

// Import Product Database Model
const product = require("./../models/product");

//  Import Create Product
const constants = require("./../constant");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const { json } = require("sequelize");

router.get("/product", async (req, res) => {
  let result = await product.findAll({ order: Sequelize.literal("id DESC") });
  res.json(result);
});

//  Create Product
router.post("/product", async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      let result = await product.create(fields);
      result = await uploadImage(files, result);

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (error) {
    res.json({ result: "nok" });
  }
});

// Upload Image
uploadImage = async (files, doc) => {
  if (files.image != null) {
    var fileExtention = files.image.name.split(".")[1];
    doc.image = `${doc.id}.${fileExtention}`;
    var newpath =
      path.resolve(__dirname + "./../uploaded/images") + "/" + doc.image;
    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.path, newpath);

    // Update database
    let result = product.update(
      { image: doc.image },
      { where: { id: doc.id } }
    );
    return result;
  }
};

module.exports = router;
