const ActiveChatbot = require("../../models/ActiveChatbot");
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

const activeChatbot = async function (req, res) {
  const userId = req.body.user.id;
  const chatbotId = req.body.chatbotId;

  try {
    const result = await Chatbot.findOne({ _id: chatbotId });
    if (result) {
      try {
        const chatbots = await ActiveChatbot.find({ userId });

        if (chatbots && chatbots.length) {
          const updateData = {
            $set: {
              chatbotId,
            },
          };

          try {
            const rs = await ActiveChatbot.updateOne({ userId }, updateData);
            res.status(200).json(rs);
          } catch (err3) {
            res.status(500).json({
              errors: {
                msg: "Internal server errror",
              },
            });
          }
        } else {
          const data = {
            userId,
            chatbotId,
          };
          const newActiveChatbot = new ActiveChatbot(data);

          try {
            const rs = newActiveChatbot.save();
            res.status(200).json(rs);
          } catch (err2) {
            res.status(500).json({
              errors: {
                msg: "Internal server errror",
              },
            });
          }
        }
      } catch (err1) {
        res.status(500).json({
          errors: {
            msg: "Internal server errror",
          },
        });
      }
    } else {
      res.status(400).json({
        error: {
          msg: "Chatbot not found",
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: "Internal server errror!",
      },
    });
  }
};

const getActiveChatbot = async function (req, res) {
  const userId = req.body.user.id;

  try {
    const result = await ActiveChatbot.findOne({ userId });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};

module.exports = {
  addChatbot,
  getChatbots,
  activeChatbot,
  getActiveChatbot,
};
