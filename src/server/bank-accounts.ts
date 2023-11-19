import { type Account } from "@/app/AccountList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function refreshToken() {
  const refreshToken = cookies().get("refresh_token")?.value;

  console.log(refreshToken);

  if (!refreshToken) {
    redirect(
      `https://api-auth.sparebank1.no/oauth/authorize?client_id=${process.env.SPAREBANK1_CLIENT_ID}&redirect_uri=${process.env.SPAREBANK1_REDIRECT_URI}&finInst=fid-ostlandet&response_type=code`,
    );
  }

  const res = await fetch("http://localhost:3000/api/bank/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  });

  console.log(res.status);

  if (!res.ok) {
    redirect(
      `https://api-auth.sparebank1.no/oauth/authorize?client_id=${process.env.SPAREBANK1_CLIENT_ID}&redirect_uri=${process.env.SPAREBANK1_REDIRECT_URI}&finInst=fid-ostlandet&response_type=code`,
    );
  }
}

export async function getAccounts(): Promise<{ accounts: Account[] }> {
  const token = cookies().get("access_token");

  const res = await fetch(
    "https://api.sparebank1.no/personal/banking/accounts",
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        Accept: "application/vnd.sparebank1.v1+json; charset=utf-8",
      },
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    await refreshToken();
    return getAccounts();
  }

  return await res.json();
}
