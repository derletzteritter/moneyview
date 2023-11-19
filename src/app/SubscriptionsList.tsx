import { getAccounts } from "@/server/bank-accounts";
import prisma from "@/server/database/database";
import { Subscription } from "@prisma/client";
import Link from "next/link";
import { Account } from "./AccountList";

async function getSubscriptions() {
  try {
    const subscriptions = await prisma.subscription.findMany();

    console.log(subscriptions);

    return subscriptions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function SubscriptionsList() {
  const subscriptions = await getSubscriptions();
  const { accounts } = await getAccounts();

  if (!subscriptions.length)
    return (
      <div>
        <p className="text-lg text-slate-900">No subscriptions</p>
      </div>
    );

  return (
    <div className="mt-4">
      <ul className="space-y-4">
        {subscriptions.map((subscription) => (
          <SubscriptionItem
            key={subscription.id}
            subscription={subscription}
            accounts={accounts}
          />
        ))}
      </ul>
    </div>
  );
}

const SubscriptionItem: React.FC<{
  subscription: Subscription;
  accounts: Account[];
}> = ({ subscription, accounts }) => {
  const account = accounts.find(
    (account) => account.key === subscription.accountKey,
  );

  return (
    <li
      key={subscription.id}
      className="text-slate-900 bg-slate-100 rounded-md p-4 flex justify-between items-start"
    >
      <div>
        <h3 className="font-bold text-lg">{subscription.name}</h3>
        <div>
          <p className="font-medium">
            {Intl.NumberFormat("no-NB", {
              style: "currency",
              currency: "NOK",
            }).format(subscription.price)}
          </p>
          <p className="mt-4">Selected account: {account?.name}</p>
          <p>
            Account balance:{" "}
            <span
              className={
                account?.balance >= subscription.price
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {Intl.NumberFormat("no-NB", {
                style: "currency",
                currency: "NOK",
              }).format(account?.balance ?? 0)}
            </span>
          </p>
        </div>
      </div>
      <div>
        <Link href={`/subscriptions/${subscription.id}`}>
          <p className="text-slate-900 underline">Edit</p>
        </Link>
      </div>
    </li>
  );
};
