import { Suspense } from "react";
import { SubscriptionsList } from "./SubscriptionsList";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="bg-slate-50 grow px-16 py-12">
      <div className="flex items-center space-x-4">
        <h1 className="text-slate-900 font-bold text-2xl">Subscriptions</h1>
        <Link
          href="/new"
          className="bg-teal-800 text-slate-50 px-4 py-2 rounded-md"
        >
          Add Subscription
        </Link>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <SubscriptionsList />
      </Suspense>
    </main>
  );
}
