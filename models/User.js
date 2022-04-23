const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 200,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 200,
    },
    email: {
      type: String,
      required: true,
      maxlength: 200,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 200,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", User);
