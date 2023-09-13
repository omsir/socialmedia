const mongoose = require("mongoose");

const postScema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

mongoose.models = {};

const post = mongoose.model("posts", postScema);

module.exports = post;
