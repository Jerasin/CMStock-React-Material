const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const product = sequelize.define(
  "product",
  {
    // attributes

    device_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "-",
    },
    imei: {
      type: Sequelize.NUMBER,
      // allowNull default to true
    },
    borrow_status: {
      type: Sequelize.NUMBER,
      // allowNull default to true
    },
    device_status: {
      type: Sequelize.NUMBER,
      // allowNull default to true
    },
  },
  {
    // options
  }
);

(async () => {
  await product.sync({ force: false });
})();

module.exports = product;
