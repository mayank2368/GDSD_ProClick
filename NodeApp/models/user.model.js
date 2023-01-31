"use strict";
const { DataTypes } = require("sequelize");
//Contributor : Hamza Mazhar

module.exports.UserModel = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("seller", "buyer", "admin"),
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
        },
        is_blocked: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
      // Other model options go here
      freezeTableName: true,
      //tableName: 'tablename',
      timestamps: false,
    }
  );
};
