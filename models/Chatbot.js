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
    color: {
      type: String,
      default: "#6600ff",
    },
    img: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxqdECkvvuQhUBmc6xsYJYEFTdc2jxiVFmDrbxaOKwpPhye-vH_vtEOC2T42GHLNeois8&usqp=CAU",
    },
    voice: {
      type: String,
      default: "female",
    },
    welcomeMsg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Chatbot = mongoose.model("Chatbot", ChatbotSchema);

module.exports = Chatbot;
