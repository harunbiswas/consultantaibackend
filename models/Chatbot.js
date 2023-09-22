const mongoose = require("mongoose");

// schema
const ChatbotSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    agent: {
      type: String,
      required: true,
      trim: true,
    },
    matarials: {
      type: String,
      required: true,
      trim: true,
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

const Chatbot = mongoose.model("Chatbot", ChatbotSchema);

module.exports = Chatbot;
