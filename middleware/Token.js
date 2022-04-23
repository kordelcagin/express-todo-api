const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenData) => {
      if (err) {
        return res.status(401).json({
          status: false,
          error: "Unauthorized",
        });
      } else {
        next();
      }
    });
  } else {
    return res.status(403).json({
      status: false,
      error: "Token not found in header",
    });
  }
});

module.exports = router;
