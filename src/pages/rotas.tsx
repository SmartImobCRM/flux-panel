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
import { Menu, Transition } from "@headlessui/react";
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
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
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
        
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div className="flex items-center gap-x-3 cursor-pointer hover:bg-slate-100/5 rounded-sm">
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
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Exemplo de uso
              </Dialog.Title>
              <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                <code>
                  {`
                  const body = {
                    createPayload: {
                        migracaoId: '1',
                        type: 'green',
                        payload: {},
                        title: 'Teste denovo'
                    }
                  }

                  fetch('http://localhost:3000/api/createAction', {method:'POST', body:JSON.stringify(body)}).then(e=>e.json()).then(console.log)

                  `}
                </code>
              </Dialog.Description>
              
              <Dialog.Close asChild>
                <button
                  className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div className="flex items-center gap-x-3 mt-2 cursor-pointer hover:bg-slate-100/5 rounded-sm">
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
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Exemplo de uso
              </Dialog.Title>
              <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                <code>
                  {`
                  fetch('http://localhost:3000/api/createMigracao', {method:'POST', body:JSON.stringify({id: '1111', createPayload: {
                    status: 'erro',
                    name: 'Migração com erro',
                    nImoveis: 200,
                    paused: false,
                    } })}).then(e=>e.json()).then(console.log)
                  `}
                </code>
              </Dialog.Description>
              
              <Dialog.Close asChild>
                <button
                  className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div className="flex items-center gap-x-3 mt-2 cursor-pointer hover:bg-slate-100/5 rounded-sm">
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
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Exemplo de uso
              </Dialog.Title>
              <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                <code>
                  {`
                  fetch('http://localhost:3000/api/updateMigracao', {method:'POST', body:JSON.stringify({id: '1111', createPayload: {paused: true} })}).then(e=>e.json()).then(console.log)
                `}
                </code>
              </Dialog.Description>
              
              <Dialog.Close asChild>
                <button
                  className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div className="flex items-center gap-x-3 mt-2 cursor-pointer hover:bg-slate-100/5 rounded-sm">
              <span className="rounded-lg bg-sky-400/10 px-1.5 font-mono text-[0.625rem] font-semibold leading-6 text-sky-500 ring-1 ring-inset ring-sky-300 dark:bg-sky-400/10 dark:text-sky-400 dark:ring-sky-400/30">
                POST
              </span>
              <span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
              <span className="font-mono text-xs text-zinc-400">
                /api/finalizarImovel
              </span>
              <span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
              <span className="font-mono text-xs text-zinc-400">
                Finaliza um imóvel de migração, incrementa em 1 o valor doneImoveis da migração do imóvel.
              </span>
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Exemplo de uso
              </Dialog.Title>
              <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                <code>
                  {`
                  fetch('http://localhost:3000/api/finalizarImovel', 
                  {method:'POST', body:JSON.stringify({id: '1111'})})
                  .then(e=>e.json())
                  .then(console.log)
                `}
                </code>
              </Dialog.Description>
              
              <Dialog.Close asChild>
                <button
                  className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        
        
       
      </div>
    </main>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
