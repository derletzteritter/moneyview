import { Subscription } from "@prisma/client";
import prisma from "./database/database";

export const createSubscription = async (
  subscription: Pick<
    Subscription,
    "name" | "type" | "description" | "price" | "renewal"
  >,
) => {
  const newSubscription = await prisma.subscription.create({
    data: subscription,
  });

  return newSubscription;
};
