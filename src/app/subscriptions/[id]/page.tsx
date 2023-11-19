import prisma from "@/server/database/database";
import Link from "next/link";
import { Suspense } from "react";
import { AccountSelect } from "./AccountSelect";
import { getAccounts } from "@/server/bank-accounts";

export default async function SubscriptionPage({
  params,
}: {
  params: { id: string };
}) {
  const subscription = await prisma.subscription.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  const data = await getAccounts();

  if (!subscription) return <div>Subscription not found</div>;

  return (
    <main className="bg-slate-50 grow px-16 py-12">
      <div className="space-y-6">
        <Link href="/">
          <p className="text-slate-900 underline">Back</p>
        </Link>
        <h1 className="text-3xl text-teal-900 font-bold">
          {subscription.name}
        </h1>
      </div>

      <div className="mt-2">
        <p className="text-slate-900 font-medium">
          {Intl.NumberFormat("no-NB", {
            style: "currency",
            currency: "NOK",
          }).format(subscription.price)}
          <span className="font-medium text-teal-800">
            {" "}
            {subscription.renewal}
          </span>
        </p>
      </div>

      <Suspense fallback={<p>Loading</p>}>
        <div className="mt-4 space-y-2">
          <p className="font-medium">Choose account for subscription</p>
          <AccountSelect
            accounts={data.accounts}
            defaultValue={subscription.accountKey}
          />
        </div>
      </Suspense>
    </main>
  );
}
