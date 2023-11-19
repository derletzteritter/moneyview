"use client";

import React, { useState } from "react";

export interface Account {
  key: string;
  id: string;
  name: string;
  balance: number;
}

interface AccountListProps {
  accounts: Account[];
}

export const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
  const [search, setSearch] = useState("");

  const regExp = new RegExp(search, "i");

  return (
    <div>
      <div>
        <div className="relative rounded-lg w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="absolute text-slate-400 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="font-sans block text-sm w-full pl-10 py-2.5 px-3 text-slate-500 rounded-lg bg-slate-200 font-medium border border-slate-300"
          />
        </div>
      </div>
      <ul className="space-y-4 mt-4">
        {accounts &&
          accounts
            .sort((a, b) => b.balance - a.balance)
            .filter((a) => a.name.match(regExp))
            .map((account: any) => (
              <li
                key={account.key}
                className="bg-slate-100 p-3 rounded-md space-y-2 border border-slate-300"
              >
                <p className="text-slate-900 font-medium">{account.name}</p>
                <p className="text-slate-600">
                  {Intl.NumberFormat("nb-NO", {
                    style: "currency",
                    currency: "NOK",
                  }).format(account.balance)}
                </p>
              </li>
            ))}
      </ul>
    </div>
  );
};
