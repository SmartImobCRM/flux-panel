import Layout from "../layout"



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
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useRouter } from "next/router"
import { api } from "~/utils/api"
import { formatTimeAgo } from "~/utils/datestuff"

const navigation = [
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Deployments', href: '#', icon: ServerIcon, current: true },
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
const secondaryNavigation = [
  { name: 'Visão geral', href: '#', disabled: false, value: 'dash' },
  { name: 'Configurações', href: '#', disabled: false, value: 'config' },
  // { name: 'Settings', href: '#', disabled: true, current: false },
  // { name: 'Collaborators', href: '#', disabled: true, current: false },
  // { name: 'Notifications', href: '#', disabled: true, current: false },
]
const statuses = { 
    info: 'text-slate-100 bg-slate-100/10', green: 'text-green-400 bg-green-400/10', error: 'text-rose-400 bg-rose-400/10' }
const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '2d89f0c8',
    branch: 'main',
    status: 'Completed',
    duration: '25s',
    date: '45 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  // More items...
]

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

const statusesMigracao = {
    'pendente': 'text-gray-500 bg-gray-100/10',
    'em andamento': 'text-green-400 bg-green-400/10',
    'concluido': 'text-rose-400 bg-rose-400/10',
    'erro': 'text-rose-400 bg-rose-400/10',
}

export default function Page() {
    const {query: { id }} = useRouter()
    const [page, setPage] = useState('dash') // <'dash' | 'config'>
    const { data: getMigracao, isLoading: isLoadingGetMigracao } = api.migracao.getMigracao.useQuery({ id: id as string })
    const { data, isLoading: isLoadingGetActionsFromMigracao } = api.action.getActionsFromMigracao.useQuery({ id: id as string })
    if (isLoadingGetMigracao || isLoadingGetActionsFromMigracao) return <div></div>
    if (!getMigracao || !data) return <div></div>
    const { actions } = data;
    const getActionsFromMigracao = actions;
    const stats = [
        { name: 'Imóveis finalizados', value: getMigracao?.doneImoveis, },
        { name: 'Ações verdes', value: getActionsFromMigracao?.filter(action => action.type === 'green').length },
        { name: 'Total de imóveis', value: getMigracao.nImoveis },
        { name: 'Erros', value: getActionsFromMigracao?.filter(action => action.type === 'error').length },
    ]
    if (page === 'config') {
      return <main className="lg:pr-96">
        <header>
          {/* Secondary navigation */}
          <nav className="flex overflow-x-auto border-b border-white/10 py-4">
            <ul
              role="list"
              className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name} onClick={() => setPage(item.value)}>
                  <a href={item.href} className={item.disabled ? 'opacity-50 pointer-events-none' : '' + item.value === page ? 'text-indigo-400' : ''}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <Config/>
      </main>
    }
    return (
    <>  <main className="lg:pr-96">
            <header>
              {/* Secondary navigation */}
              <nav className="flex overflow-x-auto border-b border-white/10 py-4">
                <ul
                  role="list"
                  className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                >
                  {secondaryNavigation.map((item) => (
                    <li key={item.name} onClick={() => setPage(item.value)}>
                      <a href={item.href} className={item.disabled ? 'opacity-50 pointer-events-none' : '' + item.value === page ? 'text-indigo-400' : ''}>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Heading */}
              <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
                <div>
                  <div className="flex items-center gap-x-3">
                    
                    <div className={classNames(statusesMigracao[getMigracao?.status as 'pendente'], 'flex-none rounded-full p-1')}>
                        {
                            getMigracao?.status !== 'pendente' && <span className="animate-ping absolute h-2 w-2 rounded-full bg-current"></span>
                        }
                        <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                    <h1 className="flex gap-x-3 text-base leading-7">
                      <span className="font-semibold text-white">{getMigracao?.name}</span>
                    </h1>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-gray-400">Rodando no servidor: Local</p>
                </div>
                {
                    getMigracao?.paused && <div className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
                        Pausado
                    </div>
                }
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, statIdx) => (
                  <div
                    key={stat.name}
                    className={classNames(
                      statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                      'border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8'
                    )}
                  >
                    <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                      <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                      
                    </p>
                  </div>
                ))}
              </div>
            </header>
              <div className="border-t border-white/10 pt-11">
              <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Logs recentes</h2>
              <table className="mt-6 w-full whitespace-nowrap text-left">
                <colgroup>
                  <col className="w-full sm:w-4/12" />
                  <col className="lg:w-4/12" />
                  <col className="lg:w-2/12" />
                  <col className="lg:w-1/12" />
                  <col className="lg:w-1/12" />
                </colgroup>
                <thead className="border-b border-white/10 text-sm leading-6 text-white">
                  <tr>
                    <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                      Título
                    </th>
                    <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                      Tipo
                    </th>
                    <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                      Tempo
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                    >
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {getActionsFromMigracao?.map((action) => (
                    <tr key={action.id}>
                      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                        <div className="flex items-center gap-x-4">
                          <div className="truncate text-sm font-medium leading-6 text-white">{action.title}</div>
                        </div>
                      </td>
                      <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                          <div className={classNames(statuses[action.type as 'error'], 'flex-none rounded-full p-1')}>
                            <div className="h-1.5 w-1.5 rounded-full bg-current" />
                          </div>
                          <Dialog.Root>
                            <Dialog.Trigger asChild>
                              {
                                (action.payload && JSON.stringify(action.payload) !== '{}') && <span className="cursor-pointer text-sm font-medium leading-6 text-white">Ver payload</span>
                              }
                            </Dialog.Trigger>
                            <Dialog.Portal>
                              <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                              <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                  Payload de: <span>{action.title}</span>
                                </Dialog.Title>
                                <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                                  {JSON.stringify(action.payload, null, 2)}
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
                      </td>
                      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                        {formatTimeAgo(action.createdAt)}
                      </td>
                      <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                        {action.createdAt.toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric'
                            })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            {/* Activity list */}
          </main>
    </>
  )
}

const Config = () => {
  return <div className="divide-y divide-white/5">
  
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-white">Iniciar migração a força</h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Iniciar a migração com o número de nodos especificado.
        </p>
      </div>

      <form className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="logout-password" className="block text-sm font-medium leading-6 text-white">
              Número de nodos (Máx: 4)
            </label>
            <div className="mt-2">
              <input
                id="nodes"
                name="nodes"
                type="number"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Iniciar
          </button>
        </div>
      </form>
    </div>

    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-white">Deletar migração</h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Deletar a migração vai fazer com que todos os nodos relacionados ao servidor da migração sejam parados. O dataset não será deletado.
        </p>
      </div>

      <form className="flex items-start md:col-span-2">
        <button
          type="submit"
          className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
        >
          Sim, deletar migração
        </button>
      </form>
    </div>
  </div>
}

Page.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout>
          {page}
      </Layout>
    )
}