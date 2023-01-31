//author: hamza_mazhar
"use strict";
var debug = require("debug");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const cors = require("cors");

var routes = require("./routes/index");
const imageDataRoutes = require("./routes/image-data.routes");
const UserRoutes = require("./routes/user.routes");
const ReviewsRoutes = require("./routes/reviews.routes");
const SalesRoutes = require("./routes/sales.routes");
const socketio = require("socket.io");
const ChatRoutes = require("./routes/chat.routes");
const ConversationRoutes = require("./routes/conversation.routes");

// const server = http.createServer(app);
const Pool = require("pg").Pool;

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./routes/socketUser");

const pool = new Pool({
  user: "username",
  host: "host",
  database: "db",
  password: "password",
  port: 5432,
});
const PORT = process.env.PORT || 3333;
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "uploads")));
//app.use(express.static(path.join(__dirname, "public")));
//app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, '/public/index.html'));
//});

//app.use(express.static('public'));
//app.use('/images', express.static('images'));
//app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, '/public/index.html'));
//});

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// using as middleware
app.use("/", routes);
app.use("/api/media", imageDataRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/review", ReviewsRoutes);
app.use("/api/chat", ChatRoutes);
app.use("/api/conversation", ConversationRoutes);
app.use("/api/sales", SalesRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});

app.set("port", process.env.PORT || 3000);

var server = app.listen(app.get("port"), function () {
  debug("Express server listening on port " + server.address().port);
});

//socket programming for the chat
//TODO need to change the logic
// Static Data checking without db

// end socket here
const io = socketio(server);

io.on("connect", (socket) => {
  let address = socket.request.connection.remoteAddress;
  socket.on("join", ({ name, room, senderId }, callback) => {
    if (room === undefined || room == null || room === "") {
      room = "public"; //Default
    }
    if (name && room) {
      console.log("New Join from " + address + " Socket Id: " + socket.id);
      const { error, user } = addUser({
        id: socket.id,
        name,
        room,
        ip: address,
      });

      if (error) return callback(error);
      if (!!user && user.room) {
        socket.join(user.room);
        socket.emit("message", {
          user: "admin",
          text: `Hi ${user.name}, welcome to ${user.room} chat room`,
          name: user.name,
          socket: socket.id,
        });
        if (user) {
          socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has joined`,
            name: user.name,
            socket: socket.id,
          });
          io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room),
          });
        }
      }
    }
    callback();
  });

  socket.on("sendMessage", async (message, callback) => {
    console.log("++++++++hhere bc send message", message, socket.id);
    const user = await getUser(socket.id);
    console.log("++++++++++getting the user ", user);
    if (user !== undefined) {
      console.log("++should emit the message", user.room);
      io.to(user.room).emit("message", {
        user: user.name,
        text: message.text,
        time: message.time,
        socket: socket.id,
      });
    }
    callback();
  });

  socket.on("sendMessageNotification", (message, callback) => {
    console.log("++++++++here message notification send", message, socket.id);
    const user = getUser(message.name);
    console.log("++++++++++getting the user ", user);
    if (user !== undefined) {
      console.log("++should emit the message", user.room);
      io.to(user.room).emit("message", {
        user: user.name,
        text: message.text,
        socket: socket.id,
      });
    }
    callback();
  });

  socket.on("disconnect", () => {
    console.log("++++++++++is it even called ", socket.id);
    const user = removeUser(socket.id);
    console.log("___________here user should not be in array", user);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});
