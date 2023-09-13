const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const uScema = new mongoose.Schema(
  {
    profile: {
      type: String,
      required: true,
      default: "https://i.ibb.co/hMmg6Rb/Png-Item-1468479.png",
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
// uScema.pre("save", async (next) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = await bcrypt.hash(this.password, salt);
//     this.password = hash;
//     next();
//   } catch (err) {
//     console.log(err);
//   }
// });
mongoose.models = {};

const user = mongoose.model("users", uScema);

module.exports = user;
