module.exports = {
  development: {
    database: "piggybank_development",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "piggybank_test",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false,
  },
  production: {
    username: "root",
    password: null,
    database: "piggybank_production",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false,
  },
};
