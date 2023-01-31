/*
 * Author: Ahmed Hassan
 */
//Contributor : Hamza Mazhar
// Added new routes and env also sequelize
"use strict";
const mysql = require("mysql");
const Sequelize = require("sequelize");
const path = require("path");
const db = {}
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
//require("dotenv").config({ path: path.join(__dirname, "..", "prod.env") });

const host = process.env.HOST;
const user = process.env.DBUSER;
const password = process.env.PASSWORD;
const database = process.env.DBNAME;
const port = process.env.DB_PORT;

// mysql db connection
const dbConn = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
});
dbConn.connect(function (err) {
  if (err) {
    console.log("Connection not established to mysql database");
    console.log(err);
  }
  console.log("Database Connected with host: " + host);
});

const sequelize = new Sequelize(
  process.env.DBNAME,
  //"gdsd1",
  process.env.DBUSER,
  process.env.PASSWORD,
  {
    //host: "proclickdb.mysql.database.azure.com",
    host: process.env.HOST,
    dialect: "mysql" /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    //   dialectOptions: {
    //     socketPath: "/var/run/mysqld/mysqld.sock",
    //   },
    define: {
      paranoid: true,
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "💾 Database connection has been established successfully with host: " +
        host
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
// Create Models

db.sequelize = sequelize
db.Sequelize = Sequelize

const { UserModel } = require("../models/user.model");
const User = UserModel(sequelize);

const { ConversationModel } = require("../models/conversation");
const Conversation = ConversationModel(sequelize);

const { ChatModel } = require("../models/chat.model");
const Chat = ChatModel(sequelize);

const { ReviewModel } = require("../models/review.model");
const Review = ReviewModel(sequelize);

const { SalesModel } = require("../models/sales.model");
const Sales = SalesModel(sequelize);

if (process.env.MIGRATE_DB == "TRUE") {
  sequelize.sync().then(() => {
    console.log(`All tables synced!`);
    process.exit(0);
  });
}

// create join here
User.hasMany(Conversation, { as: "conversation", foreignKey: "buyerId" });

module.exports = {
  dbConn,
  User,
  Review,
  Sales,
  Conversation,
  Chat,
  db
};
