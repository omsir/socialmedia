// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mognoose = require("../../utils/conn.js");
const user = require("../../scema/userScema.js");
var bcrypt = require("bcryptjs");
const jose = require("jose");
export default async function handler(req, res) {
  const secret = new TextEncoder().encode(process.env.JWT_SECREATE);
  const alg = "HS256";
  if (req.method == "POST") {
    try {
      let resp = await user.find({ email: req.body.email });
      if (resp[0].email == req.body.email) {
        let ismatched = await bcrypt.compare(
          req.body.password,
          resp[0].password,
        );
        if (ismatched) {
          const token = await new jose.SignJWT({
            firstname: resp[0].firstname,
            lastname: resp[0].lastname,
            email: resp[0].email,
          })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime("3000h")
            .sign(secret);

          res.setHeader(
            "Set-Cookie",
            `jwt=${token}; HttpOnly; Path=/; Max-Age=86400`,
          ); // 24 hours in seconds

          res
            .status(201)
            .json({ sucess: true, message: "Login Sucess", token: token });
        } else {
          res.status(401).json({
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
