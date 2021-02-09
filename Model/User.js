const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  username: String,
  picture: Object,
  hash: String,
  token: String,
  salt: String,
  favoredComic: Array,
  favoredCharacter: [Object],
});

module.exports = User;
