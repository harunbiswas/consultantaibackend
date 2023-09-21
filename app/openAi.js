const { Configuration, OpenAIApi } = require("openai");
const value = require("../data");

async function chatOpenAi(req, res, next) {
  const { text, name } = req.body;

  const data = [];

  const key = process.env.OPENAI_KEY;
  const configuration = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "assistant", content: text },
        { role: "system", content: value[name] },
      ],
    });

    // Process the completion response

    completion.data.choices.forEach((item) => {
      data.push({ text: item.message.content });
    });

    res.status(200).json(data);
  } catch (error) {
    // Handle errors
    console.error(error.response);
    res.status(500).json("Internal server error");
  }
}

module.exports = { chatOpenAi };
