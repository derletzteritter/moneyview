import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();

  const refreshToken = body.refreshToken;
  if (!refreshToken) {
    return NextResponse.json(
      {
        error: "Missing refresh token",
      },
      { status: 400 },
    );
  }

  const fetchRes = await fetch("https://api-auth.sparebank1.no/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.SPAREBANK1_CLIENT_ID as string,
      client_secret: process.env.SPAREBANK1_CLIENT_SECRET as string,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!fetchRes.ok) {
    return NextResponse.json(
      {
        error: "Failed to refresh token",
      },
      { status: 400 },
    );
  }

  const data = await fetchRes.json();

  const res = NextResponse.json({ success: true }, { status: 200 });
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
};
