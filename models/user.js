"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      income: DataTypes.INTEGER,
      expenses: DataTypes.INTEGER,
      savings_rate: DataTypes.INTEGER,
      plaid_access_token: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
