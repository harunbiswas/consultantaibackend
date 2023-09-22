const { check } = require("express-validator");

const addChatbotValidation = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Business name is required!")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("agent")
    .isLength({ min: 1 })
    .withMessage("Agent name is required!")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("matarials")
    .isLength({ min: 1 })
    .withMessage("Truining Matarials is required!")
    .trim(),
];

module.exports = { addChatbotValidation };
