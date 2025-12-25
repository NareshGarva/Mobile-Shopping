const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true, // use system CA
    },
  },
  logging: false,
});

module.exports = sequelize;
