const mognoose = require("../../utils/conn.js");
const user = require("../../scema/userScema.js");
var bcrypt = require("bcryptjs");

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      let users = await user.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        profile: req.body.profile,
      });
      console.log(users);
      res.status(201).json({ sucess: true });
    } catch (err) {
      console.log(err)
      res.status(401).json({ sucess: false });
    }
  }
}
