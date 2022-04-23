const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);

  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const isEmail = emailRegexp.test(req.body.email);

  if (isEmail !== true) {
    return res.status(200).json({
      status: false,
      error: "Email is not valid",
    });
  }

  const user = new User(req.body);

  user.save((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        status: false,
        error:
          err.code == 11000
            ? "Email address cannot be used"
            : "something went wrong",
      });
    }

    let token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "24h",
    });

    res.json({ status: true, data: user, token: token });
  });
};

exports.login = async (req, res) => {
  let { email, password } = req.body;

  User.findOne({ email: email }, async function (err, user) {
    if (err || !user) {
      return res.status(400).json({
        status: false,
        error: "User not found",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
      });

      res.json({ status: true, data: user, token: token });
    } else {
      return res.status(400).json({
        status: false,
        error: "Password Incorrect!",
      });
    }
  });
};
