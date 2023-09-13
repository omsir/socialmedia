// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method == "GET") {
    try {
      res.setHeader("Set-Cookie", `jwt=; HttpOnly; Path=/; Max-Age=86400`);
      res.status(200).json({ sucess: "true", message: "Logout Sucess" });
    } catch (err) {
      res.status(401).json({ sucess: "false", message: err.message });
    }
  }
}
