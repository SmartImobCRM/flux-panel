import Layout from "./layout"
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

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
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import classNames from "~/utils/classnames";

const navigation = [
  { name: 'Projects', href: '/projetos', icon: FolderIcon, current: false },
  { name: 'Migrações', href: '/', icon: ServerIcon, current: true },
  { name: 'Activity', href: '#', icon: SignalIcon, current: false },
  { name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
  { name: 'Usages', href: '#', icon: ChartBarSquareIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
]
const teams = [
  { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
  { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
  { id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
]
const statuses = {
  'pendente': 'text-gray-500 bg-gray-100/10',
  'em andamento': 'text-green-400 bg-green-400/10',
  'concluido': 'text-rose-400 bg-rose-400/10',
  'erro': 'text-rose-400 bg-rose-400/10',
}
const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}
const deployments = [
  {
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  // More deployments...
]

export default function Page() {
  const [ page, setPage ] = useState(0)
  const { data, fetchNextPage, isLoading } = api.migracao.recentMigracao.useInfiniteQuery({
    limit:10,
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
  
  const handleFetchNextPage = () => {
    // if last page number of itens is less than limit, then there is no next page
    if ((data?.pages[page]?.items || []).length < 10) return;
    fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    if (page === 0) return;
    setPage((prev) => prev - 1);
  };
  
  const toShow = data?.pages[page]?.items;
  
  return <main className="lg:pr-96">
    <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="text-base font-semibold leading-7 text-white">Migrações</h1>
      
      {
        isLoading && <div className="flex items-center justify-center mt-6">
          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        </div>
      }
    </header>

    <ul role="list" className="divide-y divide-white/5">
      {toShow?.map((migracao) => (
        <Link href={`/migracoes/${migracao.id}`} key={migracao.id}>
        <li className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <div className={classNames(statuses[migracao.status as 'pendente'], 'flex-none rounded-full p-1')}>
                {
                  migracao.status !== 'pendente' && <span className="animate-ping absolute h-2 w-2 rounded-full bg-current"></span>
                }
                <div className="h-2 w-2 rounded-full bg-current" />
              </div>
              <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                <span className="flex gap-x-2">
                  <span className="truncate">{migracao.name || 'Migração sem nome'}</span>
                </span>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
              <p className="truncate">Data de cadastro: {new Date(migracao.createdAt).toLocaleString()}</p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="whitespace-nowrap">Última atualização: {new Date(migracao.updatedAt).toLocaleString()}</p>
            </div>
          </div>
          {
            migracao.paused && <div
              className={classNames(
                environments['Production'],
                'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
              )}
            >
              Migração pausada
            </div>
          }
          <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
        </li>
        </Link>
      ))}
    </ul>

    {
      !((toShow?.length || 0) < 10) || page !== 0 && (
        <div className="w-full flex justify-center mt-2">
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <span
              
              onClick={() => handleFetchPreviousPage()}
              className={`${page === 0 ? 'opacity-50': ''} relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            
            <span
              onClick={() => handleFetchNextPage()}
              className={`${(toShow?.length || 0)<10 ? 'opacity-50': ''} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </nav>
        </div>
      )
    }
    
    
  </main>
}


 
Page.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
        {page}
    </Layout>
  )
}