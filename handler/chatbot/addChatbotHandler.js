const Chatbot = require("../../models/Chatbot");

const getChatbots = async function (req, res) {
  const userId = req.body.user.id;

  try {
    const result = await Chatbot.find({ userId });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      errors: "Internal server errors",
    });
  }
};

const addChatbot = async function (req, res) {
  const { name, agent, matarials } = req.body;
  const data = {
    name,
    agent,
    matarials,
    userId: req.body.user.id,
  };

  const newChatbot = new Chatbot(data);

  try {
    const result = await newChatbot.save();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errors: {
        msg: "Internal server errors",
      },
    });
  }
};

module.exports = {
  addChatbot,
  getChatbots,
};
