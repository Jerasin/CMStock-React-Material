const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const borrow = sequelize.define(
  "borrow",
  {
    // attributes

    device_name: {
      type: Sequelize.STRING,
      allowNull: false,
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
    user_log: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    // options
  }
);

(async () => {
  await borrow.sync({ force: false });
})();

module.exports = borrow;
