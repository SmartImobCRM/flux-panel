import Layout from "./layout";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3Icon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import classNames from "~/utils/classnames";

export default function Page() {
  return (
    <main className="lg:pr-96">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7 text-white">
          Rotas para interação com o painel
        </h1>
      </header>
      <div className="px-8 text-white">
        <hr className="my-6 border-white/5" />
        <div className="flex items-center gap-x-3">
          <span className="rounded-lg bg-sky-400/10 px-1.5 font-mono text-[0.625rem] font-semibold leading-6 text-sky-500 ring-1 ring-inset ring-sky-300 dark:bg-sky-400/10 dark:text-sky-400 dark:ring-sky-400/30">
            POST
          </span>
          <span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
          <span className="font-mono text-xs text-zinc-400">
            /api/createAction
          </span>
          <span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
          <span className="font-mono text-xs text-zinc-400">
            Cria uma ação no painel.
          </span>
        </div>
        <div className="flex items-center gap-x-3 mt-2">
          <span className="rounded-lg bg-sky-400/10 px-1.5 font-mono text-[0.625rem] font-semibold leading-6 text-sky-500 ring-1 ring-inset ring-sky-300 dark:bg-sky-400/10 dark:text-sky-400 dark:ring-sky-400/30">
            POST
          </span>
          <span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
          <span className="font-mono text-xs text-zinc-400">
            /api/createMigracao
          </span>
          <span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
          <span className="font-mono text-xs text-zinc-400">
            Cria uma migração no painel, uma migração é necessária para criar ações.
          </span>
        </div>
        <div className="flex items-center gap-x-3 mt-2">
          <span className="rounded-lg bg-sky-400/10 px-1.5 font-mono text-[0.625rem] font-semibold leading-6 text-sky-500 ring-1 ring-inset ring-sky-300 dark:bg-sky-400/10 dark:text-sky-400 dark:ring-sky-400/30">
            POST
          </span>
          <span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
          <span className="font-mono text-xs text-zinc-400">
            /api/updateMigracao
          </span>
          <span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
          <span className="font-mono text-xs text-zinc-400">
            Altera uma migração no painel.
          </span>
        </div>
       
      </div>
    </main>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
