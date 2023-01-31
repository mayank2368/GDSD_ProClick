//author: hamza_mazhar
require("dotenv").config();
// Load model
const { Chat } = require("../config/mysqldatabase.config");

// create conversation
module.exports.Create = async (req, res, next) => {
  try {
    const record = await Chat.create(req.body);
    return res.json({
      status: "success",
      result: {
        record: record,
      },
    });
  } catch (err) {
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};
//// fetch conversation by userID
module.exports.fetch = async (req, res, next) => {
  try {
    const conversationId = req.body.conversationId;
    const record = await Chat.findAll({
      where: {
        conversationId: conversationId,
      },
    });
    return res.json({
      status: "success",
      result: {
        record: record,
      },
    });
  } catch (err) {
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};
