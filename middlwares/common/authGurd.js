const jwt = require("jsonwebtoken");

const authgurd = function (req, res, next) {
  const { token } = req.headers;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (!err) {
        req.body.user = decoded;
        next();
      } else {
        console.log(err);
        res.status(500).json({
          errors: {
            msg: "Authentication errors!",
          },
        });
      }
    });
  } else {
    res.status(400).json({
      errors: {
        msg: "Token is required",
      },
    });
  }
};

module.exports = authgurd;
