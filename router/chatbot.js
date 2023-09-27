const express = require("express");
const authgurd = require("../middlwares/common/authGurd");
const {
  addChatbot,
  getChatbots,
  activeChatbot,
  getActiveChatbot,
  deleteChatbot,
  getChatbot,
} = require("../handler/chatbot/addChatbotHandler");
const {
  addChatbotValidation,
} = require("../middlwares/chatbot/chatbotValidation");
const { validationHandler } = require("../middlwares/users/userValidators");
const router = express.Router();

// get Chatbots
router.get("/", authgurd, getChatbots);

// active chatbot
router.put("/activechatbot", authgurd, activeChatbot);

// get active chatbot
router.get("/activechatbot", authgurd, getActiveChatbot);

// add chatbot
router.post(
  "/addchatbot",
  authgurd,
  addChatbotValidation,
  validationHandler,
  addChatbot
);

router.get("/getchatbot", getChatbot);

// Delete chatbot
router.delete("/", authgurd, deleteChatbot);

module.exports = router;
