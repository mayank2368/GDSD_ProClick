"use strict";
const { DataTypes } = require("sequelize");
//Contributor : Hamza Mazhar

module.exports.ConversationModel = (sequelize) => {
  return sequelize.define(
    "Conversation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      buyerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
