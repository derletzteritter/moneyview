"use client";

import * as Select from "@radix-ui/react-select";
import { Account } from "@/app/AccountList";
import { Landmark } from "lucide-react";
import { useFormState } from "react-dom";
import { useParams } from "next/navigation";
import { updateSubscriptionAccount } from "./actions";

export function AccountSelect({
  accounts,
  defaultValue,
}: {
  accounts: Account[];
  defaultValue: string | null;
}) {
  const params = useParams<{ id: string }>();

  const initialFormState = {
    id: params.id,
  };

  const [state, formAction] = useFormState(
    updateSubscriptionAccount,
    initialFormState,
  );

  return (
    <form action={formAction}>
      {state?.message && (
        <div className="bg-red-100 text-red-800 rounded-md px-4 py-2 mt-2">
          {state.message}
        </div>
      )}

      <Select.Root name="accountkey" defaultValue={defaultValue}>
        <Select.Trigger className="inline-flex justify-center items-center border-slate-300 rounded-md leading-none h-[35px] gap-[5px] bg-white border px-2">
          <Select.Icon>
            <Landmark size={16} className="text-teal-800" />
          </Select.Icon>
          <Select.Value placeholder="Select bank account" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-white border border-slate-300 rounded-md w-full">
            <Select.Viewport className="p-[5px]">
              {accounts &&
                accounts
                  .sort((a, b) => b.balance - a.balance)
                  .map((account) => (
                    <Select.SelectItem
                      key={account.key}
                      value={account.key}
                      className="p-2 flex flex-col justify-start items-start enter text-sm active:bg-slate-100 hover:bg-slate-100 rounded-md outline-none font-medium"
                    >
                      <div>
                        <Select.ItemText className="">
                          {account.name}
                        </Select.ItemText>
                      </div>
                      <div>
                        <p className="text-teal-800">
                          {Intl.NumberFormat("no-NB", {
                            style: "currency",
                            currency: "NOK",
                          }).format(account.balance)}
                        </p>
                      </div>
                    </Select.SelectItem>
                  ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <div className="mt-4">
        <button
          type="submit"
          className="rounded-md bg-teal-800 text-sm text-white font-medium px-4 py-2"
        >
          Save
        </button>
      </div>
    </form>
  );
}
