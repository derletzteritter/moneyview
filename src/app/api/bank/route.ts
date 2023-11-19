import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  console.log("code", code);

  if (!code || !state) {
    return NextResponse.redirect("/");
  }

  const fetchRes = await fetch("https://api-auth.sparebank1.no/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.SPAREBANK1_CLIENT_ID as string,
      client_secret: process.env.SPAREBANK1_CLIENT_SECRET as string,
      code: code,
      grant_type: "authorization_code",
      state: state,
      redirect_url: process.env.SPAREBANK1_REDIRECT_URL as string,
    }),
  });

  const data = await fetchRes.json();

  const res = NextResponse.redirect("http://localhost:3000/");

  res.cookies.set({
    name: "access_token",
    value: data.access_token,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
  res.cookies.set({
    name: "refresh_token",
    value: data.refresh_token,
    path: "/",
    sameSite: "lax",
    secure: true,
  });

  return res;
}
