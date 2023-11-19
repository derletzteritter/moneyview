import { getAccounts } from "@/server/bank-accounts";
import { AccountList } from "../AccountList";

export default async function AccountsPage() {
  const data = await getAccounts();

  return (
    <main className="bg-slate-50 grox px-16 py-12">
      <AccountList accounts={data.accounts} />
    </main>
  );
}
