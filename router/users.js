const express = require("express");
const {
  addUserValidators,
  validationHandler,
  loginValidators,
  googleValidators,
} = require("../middlwares/users/userValidators");
const {
  signupHandler,
  loginHandler,
  googleLoginHandler,
} = require("../handler/user/userHandler");
const router = express.Router();

// singup
router.post("/", addUserValidators, validationHandler, signupHandler);

// login
router.post("/login", loginValidators, validationHandler, loginHandler);
router.post(
  "/google/login",
  googleValidators,
  validationHandler,
  googleLoginHandler
);

module.exports = router;
