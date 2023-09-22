const bcrypt = require("bcrypt");
const People = require("../../models/People");
const jwt = require("jsonwebtoken");

// signup handler
const signupHandler = async function (req, res, next) {
  let newUser;
  const hashedPass = await bcrypt.hash(req.body.password, 10);

  newUser = new People({
    ...req.body,
    password: hashedPass,
  });

  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "user was added successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
};

const loginHandler = async function (req, res, next) {
  const { email, password } = req.body;
  try {
    const result = await People.findOne({ email });

    if (result && result._id) {
      const isValidPass = await bcrypt.compare(password, result.password);

      if (isValidPass) {
        // jwt token
        const userObject = {
          id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
        };

        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        userObject.token = token;

        res.status(200).json({ user: userObject });
      } else {
        res.status(400).json({
          errors: {
            password: {
              msg: "Password incorrect",
            },
          },
        });
      }
    } else {
      res.status(400).json({
        errors: {
          email: {
            msg: "user not found",
          },
        },
      });
    }
  } catch (err) {
    res.status(400).json("Internal server error!");
  }
};

const googleLoginHandler = async function (req, res, next) {
  const token = jwt.sign(req.body, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  const userObject = req.body;
  userObject.token = token;

  res.status(200).json(userObject);
};

module.exports = {
  signupHandler,
  googleLoginHandler,
  loginHandler,
};
