import mongoose from "mongoose";

const postScema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
    },
  },
  { timestamps: true },
);

mongoose.model = {};

const post = mongoose.model("posts", postScema);

module.exports = post;
