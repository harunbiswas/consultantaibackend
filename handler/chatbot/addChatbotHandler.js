const ActiveChatbot = require("../../models/ActiveChatbot");
const Chatbot = require("../../models/Chatbot");
const mongoose = require("mongoose");

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

    try {
      const rs = await Chatbot.findOne({ _id: result.chatbotId });

      if (rs) {
        res.status(200).json(rs);
      } else {
        try {
          const result1 = await Chatbot.find({ userId });
          const updateData = {
            $set: {
              chatbotId: result1[0]._id,
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
        } catch (err) {
          res.status(500).json({
            errors: {
              msg: "Internal server errors",
            },
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        errors: {
          msg: "Internal server error",
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};

const deleteChatbot = async function (req, res) {
  try {
    const result = await Chatbot.deleteOne({ _id: req.body.id });
    res.status(200).json("DELETE Chatbot");
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};

const getChatbot = async function (req, res) {
  const id = req.query;
  const ObjectId = mongoose.Types.ObjectId;

  function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  if (isValidObjectId(id)) {
    const objectId = new ObjectId(id);
    try {
      const result = await Chatbot.findOne({ _id: objectId });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json("Internal server errors");
    }
  } else {
    res.status(400).json("Chatbot id invalid");
  }
};

module.exports = {
  addChatbot,
  getChatbots,
  activeChatbot,
  getActiveChatbot,
  deleteChatbot,
  getChatbot,
};
