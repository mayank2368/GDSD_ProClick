/*
 * Contributor: Hamza Mazhar
 */

const { Router } = require("express");
const router = Router();
const chat = require("./../services/chat.service");

const { authenticateToken } = require("../middleware/userMiddleware");

//add
//new conv

router.post(
  "/",
  //   [authenticateToken],
  chat.Create
);
//get conv of a user

router.post("/userconversationbyid", chat.fetch);

module.exports = router;
