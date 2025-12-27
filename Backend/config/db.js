const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.TIDB_HOST,
  port: 4000,
  username: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  dialectOptions: {
    ssl: {
      minVersion: "TLSv1.2",
    },
  },
  logging: false,
});

module.exports = sequelize;
