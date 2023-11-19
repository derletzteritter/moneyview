"use client";

import * as Select from "@radix-ui/react-select";
import { Apple, CaseSensitive, Clapperboard, Music } from "lucide-react";
import { useFormState } from "react-dom";
import { newSubscriptionServerAction } from "./actions";

const initialFormState = {
  message: null,
};

export default function NewPage() {
  const [state, formAction] = useFormState(
    newSubscriptionServerAction,
    initialFormState,
  );

  return (
    <main className="bg-slate-50 grow px-16 py-12">
      <div>
        <h1 className="text-3xl text-slate-900 font-bold">New subscription</h1>
      </div>

      {state?.message && (
        <div className="bg-red-100 text-red-800 rounded-md px-4 py-2 mt-2">
          {state.message}
        </div>
      )}

      <div className="w-full mt-4">
        <form className="w-full flex flex-col space-y-4" action={formAction}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-slate-300 rounded-md px-2 py-2"
            />
          </div>

          <div className="flex flex-col items-start space-y-1">
            <label htmlFor="type" className="font-medium">
              Type
            </label>
            <TypeSelect />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="renewal" className="font-medium">
              Renewal type
            </label>
            <select
              id="renewal"
              name="renewal"
              className="border border-slate-300 rounded-md px-2 py-2"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="price" className="font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="border border-slate-300 rounded-md px-2 py-2"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border border-slate-300 rounded-md px-2 py-2"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-slate-900 text-white rounded-md px-4 py-2"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

const subscriptionTypes = [
  {
    value: "netflix",
    label: "Netflix",
    icon: <Clapperboard size={16} />,
  },
  {
    value: "spotify",
    label: "Spotify",
    icon: <Music size={16} />,
  },
  {
    value: "apple",
    label: "Apple",
    icon: <Apple size={16} />,
  },
  {
    value: "other",
    label: "Other",
    icon: <CaseSensitive size={16} />,
  },
];

const TypeSelect = () => {
  return (
    <Select.Root name="type">
      <Select.Trigger
        name="type"
        id="type"
        className="inline-flex border-slate-300 items-center justify-center rounded-md  px-6 leading-none h-[35px] gap-[5px] bg-white border"
      >
        <Select.Value placeholder="Select a type" id="type" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white border border-slate-300 rounded-md">
          <Select.Viewport className="p-[5px]">
            {subscriptionTypes.map((t) => (
              <Select.SelectItem
                key={t.value}
                value={t.value}
                className="p-2 flex items-center space-x-2 text-sm active:bg-slate-100 hover:bg-slate-100 rounded-md outline-none font-medium"
              >
                {t.icon}
                <Select.ItemText className="">{t.label}</Select.ItemText>
              </Select.SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
