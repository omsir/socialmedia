// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const post = require("../../scema/postScema.js");

export default async function handler(req, res) {
  if (req.method == "POST") {
    let resp = await post.findById(req.body.id);
    let like = resp.like;

    let respionse = await post.findByIdAndUpdate(req.body.id, {
      like: like + 1,
    });
    res.status(201).json({ sucess: true, message: "Liked" });
  }
}
