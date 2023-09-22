const express = require("express");
const authgurd = require("../middlwares/common/authGurd");
const {
  addChatbot,
  getChatbots,
} = require("../handler/chatbot/addChatbotHandler");
const {
  addChatbotValidation,
} = require("../middlwares/chatbot/chatbotValidation");
const { validationHandler } = require("../middlwares/users/userValidators");
const router = express.Router();

// get Chatbots
router.get("/", authgurd, getChatbots);

// add chatbot
router.post(
  "/addchatbot",
  authgurd,
  addChatbotValidation,
  validationHandler,
  addChatbot
);

module.exports = router;
