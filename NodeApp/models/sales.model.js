/*
 * Author: Ahmed Hassan
 */
//Contributor : Hamza Mazhar

"use strict";
const { DataTypes } = require("sequelize");
module.exports.SalesModel = (sequelize) => {
  return sequelize.define(
    "tbl_sales",
    {
      sale_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      media_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      buyer_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      seller_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
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
