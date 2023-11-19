"use server";

import { createSubscription } from "@/server/subscription";
import { warn } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function newSubscriptionServerAction(
  prevState: any,
  data: FormData,
) {
  let sub = null;
  try {
    const name = data.get("name") as string;
    const type = data.get("type") as string;
    const price = data.get("price") as string;
    const description = data.get("description") as string;
    const renewal = data.get("renewal") as string;

    console.log(name, type, price, description, renewal);

    if (!name || !type || !price || !description || !renewal) {
      return { message: "Please fill out all fields" };
    }

    sub = await createSubscription({
      name,
      type,
      price: parseFloat(price),
      renewal,
      description,
    });
  } catch (e) {
    console.error(e);
  }

  if (sub) {
    revalidatePath("/");
    redirect(`/subscriptions/${sub.id}`);
  }
}
