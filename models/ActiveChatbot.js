const mongoose = require("mongoose");

// schema
const activeChatbotSchema = mongoose.Schema(
  {
    chatbotId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ActiveChatbot = mongoose.model("ActiveChatbot", activeChatbotSchema);

module.exports = ActiveChatbot;
