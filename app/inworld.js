const { InworldClient, InworldPacket } = require("@inworld/nodejs-sdk");

async function sayHello(req, res, next) {
  const { text, name } = req.body;
  const key = process.env.INWORLD_KEY;
  const secret = process.env.INWORLD_SECRET;
  const scene = process.env.INWORLD_SCENE + name;
  const data = [];

  console.log(scene);
  const client = new InworldClient()
    .setApiKey({
      key,
      secret,
    })
    .setConfiguration({
      capabilities: {
        audio: false,
        emotions: true,
      },
    })
    .setScene(scene)
    .setOnError((err) => {
      console.log(err.message);
    })
    .setOnMessage((packet) => {
      if (packet.text) {
        data.push(packet.text);
      }

      if (packet.isInteractionEnd()) {
        // Send the response
        // connection.close();
        res.status(200).json(data);
      }
    });

  const connection = client.build();

  // Send the initial message
  await connection.sendText(text);
}

module.exports = { sayHello };
