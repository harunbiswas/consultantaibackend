const { Configuration, OpenAIApi } = require("openai");
const value = require("../data");
const Chatbot = require("../models/Chatbot");
const mongoose = require("mongoose");

async function chatOpenAi(req, res, next) {
  const { text } = req.body;

  const data = [];

  const key = process.env.OPENAI_KEY;
  const configuration = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(configuration);
  const { id } = req.query;

  const ObjectId = mongoose.Types.ObjectId;

  function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  if (isValidObjectId(id)) {
    const objectId = new ObjectId(id);
    try {
      const result1 = await Chatbot.findOne({ _id: objectId });

      try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "assistant", content: text },
            {
              role: "system",
              content: `You are a helpful assistant named ${result1.agent}. ${result1.matarials}`,
            },
          ],
        });

        // Process the completion response

        completion.data.choices.forEach((item) => {
          data.push({ text: item.message.content });
        });

        res.status(200).json(data);
      } catch (error) {
        // Handle errors
        // console.error(error.response);
        res.status(500).json("Internal server errors");
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json("Internal server error");
    }
  } else {
    res.status(400).json("Invalid data");
  }
}

module.exports = { chatOpenAi };
