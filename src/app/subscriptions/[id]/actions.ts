"use server";

import prisma from "@/server/database/database";
import { revalidatePath } from "next/cache";

export async function updateSubscriptionAccount(
  prevState: any,
  data: FormData,
) {
  const accountKey = data.get("accountkey") as string;

  console.log("accountKey", accountKey);

  try {
    await prisma.subscription.update({
      data: {
        accountKey: accountKey,
      },
      where: {
        id: Number(prevState.id),
      },
    });

    revalidatePath(`/subscriptions/${prevState.id}`);
    return { message: "Account key updated" };
  } catch (e) {
    console.error(e);
    return { message: "Error updating account key" };
  }
}
