const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const product = sequelize.define(
  "product",
  {
    // attributes
    product_code: {
      type: Sequelize.NUMBER,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "-",
    },
    price: {
      type: Sequelize.NUMBER,
      // allowNull default to true
    },
    stock: {
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
