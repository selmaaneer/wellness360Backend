const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("User", userSchema);
