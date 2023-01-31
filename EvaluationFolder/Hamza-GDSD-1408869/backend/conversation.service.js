//author: hamza_mazhar

require("dotenv").config();
// Load model
const { Conversation, User } = require("../config/mysqldatabase.config");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

// create conversation
module.exports.Create = async (req, res, next) => {
  try {
    const buyerId = req.body.buyerId;
    const sellerId = req.body.sellerId;

    const recordExist = await Conversation.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              {
                sellerId: sellerId,
              },
              {
                buyerId: buyerId,
              },
            ],
          },
          {
            [Op.and]: [
              {
                sellerId: buyerId,
              },
              {
                buyerId: sellerId,
              },
            ],
          },
        ],
      },
    });
    if (recordExist.length > 0) {
      return next(
        res.status(500).json({
          error: {
            message: "record already exist",
            reason: "record already exist",
          },
        })
      );
    } else {
      const record = await Conversation.create({
        buyerId: buyerId,
        sellerId: sellerId,
      });
      return res.json({
        status: "success",
        result: {
          record: record,
        },
      });
    }
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
    const userId = req.params.userId;
    const record = await Conversation.findAll({
      where: {
        [Op.or]: [{ sellerId: userId }, { buyerId: userId }],
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

// fetch conversation id  by user and reciver if not create new conversation and return the new obj
//// fetch conversation by userID
// this end point used in the buyer dashboard fetch the conversaiton id or existing conversation
module.exports.fetchByUserAndReciver = async (req, res, next) => {
  try {
    const buyerId = req.body.buyer_Id;
    const sellerId = req.body.seller_Id;
    const record = await Conversation.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              {
                sellerId: sellerId,
              },
              {
                buyerId: buyerId,
              },
            ],
          },
          {
            [Op.and]: [
              {
                sellerId: buyerId,
              },
              {
                buyerId: sellerId,
              },
            ],
          },
        ],
      },
    });
    if (record.length > 0) {
      return res.json({
        status: "success",
        result: {
          record: record[0],
        },
      });
    } else {
      const record = await Conversation.create({
        buyerId: buyerId,
        sellerId: sellerId,
      });
      return res.json({
        status: "success",
        result: {
          record: record,
        },
      });
    }
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

// this end point is used for the seller dashboard to get the unique conversation
//// fetch unique conversation by sellerId
module.exports.fetchUniqueConversation = async (req, res, next) => {
  try {
    const sellerId = req.body.seller_id;
    const record = await Conversation.findAll({
      // include: [
      //   {
      //     model: User,
      //     as: "conversation",

      //     required: true,
      //     where: { id: Conversation.buyerId },
      //   },
      // ],
      where: { sellerId: sellerId },
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("buyerId")), "buyerId"],
      ].concat(Object.keys(Conversation.rawAttributes)),
    });
    let finalData = [];
    if (record.length > 0) {
      for (let i = 0; i < record.length; i++) {
        let userData = await User.findAll({
          where: { id: record[i].buyerId },
        });
        let obj = {
          buyerData: userData[0].first_name,
          ...record[i].dataValues,
        };
        finalData.push(obj);
      }
    }
    return res.json({
      status: "success",
      result: {
        record: finalData,
      },
    });
  } catch (err) {
    console.log("++++++++++jere is error++", err);

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
