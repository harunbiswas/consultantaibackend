const express = require("express");
const {
  addUserValidators,
  addUserValidationHandler,
  loginValidators,
} = require("../middlwares/users/userValidators");
const { signupHandler, loginHandler } = require("../handler/user/userHandler");
const router = express.Router();

// singup
router.post("/", addUserValidators, addUserValidationHandler, signupHandler);

// login
router.post("/login", loginValidators, addUserValidationHandler, loginHandler);

module.exports = router;
