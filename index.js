const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const { sayHello } = require("./app/inworld");
const elevenLabs = require("./app/elevenLabs");
const { chatOpenAi } = require("./app/openAi");
const database = require("./db/db");
const userRouter = require("./router/users");
const chatbotRouter = require("./router/chatbot");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlwares/common/ErrorHandler");

const app = express();

// database
database();

env.config();
app.use(cors());

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static folder
app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.get("", (req, res) => {
  res.status(200).json("Wellcome to chatbot.");
});

// routing setup
app.post("", sayHello);
app.post("/gpt", chatOpenAi);
app.post("/voice", elevenLabs);

app.use("/users", userRouter);
app.use("/chatbot", chatbotRouter);

// 404 not found handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// runing server
app.listen(port, (e) => {
  if (!e) {
    console.log(`Server running prot: ${port}`);
  } else {
    console.log("Internal server error!");
  }
});
