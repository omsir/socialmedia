// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mognoose = require("../../utils/conn.js");
const user = require("../../scema/userScema.js");
var bcrypt = require("bcryptjs");
export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      let resp = await user.find({ email: req.body.email });
      if (resp[0].email == req.body.email) {
        let ismatched = await bcrypt.compare(
          req.body.password,
          resp[0].password,
        );
        if (ismatched) {
          res.status(201).json({ sucess: true, message: "Login Sucess" });
        } else {
          res
            .status(401)
            .json({
              sucess: false,
              message: "Email or Password doesnot match",
            });
        }
      } else {
        res
          .status(401)
          .json({ sucess: false, message: "SOmething went wrong" });
      }
    } catch (err) {
      console.log(err);
      res.status(401).json({ sucess: false, message: "SOmething went wrong" });
    }
  }
}
