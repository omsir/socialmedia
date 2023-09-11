// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mognoose = require("../../utils/conn.js");
const post = require("../../scema/userScema.js");
export default function handler(req, res) {
  if (req.method == "POST") {
    post.create({})
  }
  if (req.method == "GET") {

  }
}
