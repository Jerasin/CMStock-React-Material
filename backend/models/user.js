const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const user = sequelize.define(
  "user",
  {
    // attributes
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    level: {
      type: Sequelize.STRING,
      defaultValue: "normal",
    },
  },
  {
    // options
  }
);

(async () => {
  await user.sync({ force: false });
})();

module.exports = user;
