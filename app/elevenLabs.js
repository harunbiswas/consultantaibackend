const { default: axios } = require("axios");

const path = require("path");
const voice = require("elevenlabs-node");

const elevenLabs = async (req, res, next) => {
  const { text, voiceType } = req.body;
  const voiceId =
    voiceType === "male" ? "ErXwobaYiN019PkySvjV" : "21m00Tcm4TlvDq8ikWAM";
  const name = Math.random().toString(36).substring(6);
  const baseURL = process.env.BASE_URL;

  const fileName = path.join("public", "audio", `audio.mp3`);
  const key = process.env.ELEVEN_KEY;
  console.log(key);

  voice.textToSpeech(key, voiceId, fileName, text).then((d) => {
    if (d) {
      const audioUrl = new URL(fileName, baseURL).href;
      res.status(200).json(audioUrl);
    } else {
      res.status(500).json("Internal server error");
    }
  });
};

module.exports = elevenLabs;
