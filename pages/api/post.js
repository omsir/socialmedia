// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mognoose = require("../../utils/conn.js");
const jose = require("jose");
const post = require("../../scema/postScema.js");
export default async function handler(req, res) {
  const secret = new TextEncoder().encode(process.env.JWT_SECREATE);
  if (req.method == "POST") {
    // const jwt = req.cookies;
    // console.log(jwt);
    // const { payload } = await jose.jwtVerify(jwt, secret);
    // if (payload.email) {
    try {
      let r = await post.create({
        name: req.body.name,
        post: req.body.post,
        email: "omprasad@gmail.com",
        profile: req.body.profile,
      });
      res.status(200).json({ sucess: true, message: "Post Sent" });
    } catch (err) {
      res.status(401).json({ sucess: false, message: "Server Error" });
    }
  }
  if (req.method == "GET") {
    try {
      let posts = await post.find({});
      res.status(201).json(posts);
    } catch (err) {
      res.status(401).json({ sucess: false, message: "Some thing went wrong" });
    }
  }
}
