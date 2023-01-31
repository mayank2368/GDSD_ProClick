/*
 * Author: Ahmed Hassan, Mayank Chetan Parvatia
 */

"use strict";
const { DataTypes } = require("sequelize");
module.exports.ReviewModel = (sequelize) => {
    return sequelize.define(
        "tbl_reviews",
        {
            review_id: {
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
            ratings: {
                type: DataTypes.INTEGER,
                allowNull: true,

            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            posted_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            //posted_date: {
            //    type: DataTypes.DATETIME,
            //    
            //    allowNull: false,
            //},

        },
        {
            // Other model options go here
            freezeTableName: true,
            //tableName: 'tablename',
            timestamps: false,
        }
    );
}