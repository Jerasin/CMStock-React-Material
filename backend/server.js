const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// ShortForm
// const app = require("express")();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/uploaded"));
app.use(cors());

app.use("/api/v2/authen/", require("./Route/api_authen"));
app.use("/api/v2/stock/", require("./Route/api_stock"));

app.listen(8085, () => {
  console.log("Backend is running..");
});
