const { check, validationResult } = require("express-validator");
const People = require("../../models/People");
const createHttpError = require("http-errors");

const addUserValidators = [
  check("firstName")
    .isLength({ min: 1 })
    .withMessage("First name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("lastName")
    .isLength({ min: 1 })
    .withMessage("First name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isLength({ min: 3 })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await People.findOne({ email: value });
        if (user) {
          throw createHttpError("Email already is use!");
        }
      } catch (err) {
        throw createHttpError(err.message);
      }
    }),
  check("password").isLength({ min: 4 }).withMessage("Less then 4 caractors"),
];
const googleValidators = [
  check("firstName")
    .isLength({ min: 1 })
    .withMessage("First name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("lastName")
    .isLength({ min: 1 })
    .withMessage("First name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isLength({ min: 3 })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .trim(),
];
const loginValidators = [
  check("email")
    .isLength({ min: 3 })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .trim(),
  check("password").isLength({ min: 4 }).withMessage("Less then 4 caractors"),
];

const validationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mapperErrors = errors.mapped();

  if (Object.keys(mapperErrors).length === 0) {
    next();
  } else {
    res.status(400).json({ errors: mapperErrors });
  }
};

module.exports = {
  addUserValidators,
  loginValidators,
  googleValidators,
  validationHandler,
};
