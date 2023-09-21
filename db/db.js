const mongoose = require("mongoose");
require("dotenv").config();
require("dotenv").config();

const database = () => {
  // database
  const databaseURL = process.env.DATABASE_URL;
  mongoose
    .connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connection successful!"))
    .catch((e) => console.error("Database connection errors", e));
};

module.exports = database;
