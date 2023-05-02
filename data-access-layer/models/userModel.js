const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: String,
    username: String,
    password: String,
    country: String,
    city: String,
    phone: String,
    email: String,
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
