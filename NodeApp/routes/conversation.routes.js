/*
 * Contributor: Hamza Mazhar
 */

const { Router } = require("express");
const router = Router();
const conversation = require("./../services/conversation.service");

const { authenticateToken } = require("../middleware/userMiddleware");

//new conv
router.post(
  "/",
  //   [authenticateToken],
  conversation.Create
);

//here create the route for the user and reciver id
router.post("/uniqueConversation", conversation.fetchUniqueConversation);

//get conv of a user
router.post("/getuserconversation", conversation.fetch);

//here get the conversation based on the buyer and sller
router.post("/buyersellerconveration", conversation.fetchByUserAndReciver);

module.exports = router;
