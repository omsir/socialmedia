const { NextResponse } = require("next/server");
const jose = require("jose");

export default async function middleware(req) {
  const secret = new TextEncoder().encode(process.env.JWT_SECREATE);
  let url = req.url;

  if (url.includes("/app")) {
    try {
      const jwt = req.cookies.get("jwt")?.value;
      const { payload } = await jose.jwtVerify(jwt, secret);
      if (payload.email) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect("https://bcasit.vercel.app");
      }
    } catch (err) {
      return NextResponse.redirect("https://bcasit.vercel.app");
    }
  }
}
