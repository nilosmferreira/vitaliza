import { Button } from '@/components/form/button';
import { TextInput } from '@/components/form/text-input';
import { Layout } from '@/components/layout';
import { Loading } from '@/components/loading';
import { Paginacao } from '@/components/paginacao';
import { api } from '@/infra/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import {
  FileSearch,
  Heartbeat,
  MagnifyingGlass,
  PencilSimple,
  Trash,
} from 'phosphor-react';
import { useState } from 'react';

interface UsuarioData {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    deletedAt?: Date;
    id: string;
  }[];
  count: number;
  limit: number;
  offset: number;
}
interface Response {
  users: {
    name: string;
    email: string;
    createdAt: Date;
    isActive: boolean;
  }[];
  count: number;
}
export default function Usuario() {
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: [`list-user`],
    queryFn: async () => {
      const position = currentPage * perPage;
      const { data } = await api.get<UsuarioData>('/api/controle/usuario', {
        params: {
          offset: position,
          limit: perPage,
        },
      });
      setOffset(position);
      const users = data.data.map((user) => {
        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          createdAt: new Date(user.createdAt),
          isActive: !user.deletedAt,
        };
      });
      return {
        users,
        count: data.count,
      };
    },
  });
  const handleToggleStatusUser = async (id: string, status: boolean) => {
    try {
      await api.patch(`/api/controle/usuario/${id}/toggle/${status}`);
      await queryClient.invalidateQueries(['list-user']);
    } catch (error) {}
  };
  const stateComponent = {
    loading: (
      <div className='flex items-center justify-center  fill-blue-500 stroke-blue-400 w-full h-72'>
        <Loading />
      </div>
    ),
    noregister: (
      <div className='flex items-center justify-center  fill-blue-500 stroke-blue-400 w-full h-72'>
        <span className='text-3xl text-gray-600 font-semibold '>
          Sem registros
        </span>
      </div>
    ),
    list: (
      <div className='relative bg-green-100 rounded-xl overflow-auto'>
        <div className='shadow-sm overflow-hidden my-8'>
          <div className='table border-collapse table-auto w-full text-sm'>
            <div className='table-header-group '>
              <div className='table-row'>
                <div className='table-cell border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left'>
                  Nome
                </div>
                <div className='md:table-cell hidden border-b font-medium p-4 pt-0 pb-3 text-slate-400  text-left'>
                  e-Mail
                </div>
                <div className='md:table-cell hidden border-b font-medium p-4 pt-0 pb-3 text-slate-400  text-left'>
                  Status
                </div>
                <div className='table-cell border-b font-medium p-4 pr-8 pt-1 pb-3 text-slate-400  text-left'>
                  <Link
                    href='/controle/usuario/novo'
                    className='flex justify-end'
                  >
                    <Button variant='primary'>Novo</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='table-row-group bg-white dark:bg-slate-800'>
              {data?.users?.map(({ id, name, email, isActive }) => (
                <div
                  key={id}
                  data-active={`${isActive}`}
                  className='table-row data-[active=false]:bg-red-100'
                >
                  <div className='table-cell border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
                    {name}
                  </div>
                  <div className='hidden md:table-cell border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400'>
                    {email}
                  </div>
                  <div className='hidden md:table-cell border-b border-slate-100 p-4 w-10 text-slate-500'>
                    <span
                      className={clsx('px-2 py-1 rounded-full font-semibold', {
                        'text-white bg-green-600': isActive,
                        'text-white bg-red-600': !isActive,
                      })}
                    >
                      {isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className='table-cell border-b border-slate-100  justify-end text-slate-500 '>
                    <div className='p-4 flex flex-row h-full justify-end gap-2'>
                      <Link href={`/controle/usuario/${id}`}>
                        <PencilSimple
                          size={20}
                          className='text-blue-600'
                        />
                      </Link>
                      <button
                        onClick={() => handleToggleStatusUser(id, isActive)}
                      >
                        {isActive ? (
                          <Trash
                            size={20}
                            className='text-red-600'
                          />
                        ) : (
                          <Heartbeat
                            size={20}
                            className='text-green-600'
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mx-auto w-full my-8 pl-8'>
          <Paginacao
            resultsCount={data?.count}
            limit={perPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>
    ),
  };
  return (
    <Layout>
      <div className='container  mx-auto px-2 sm:px4 max-w-4xlxl'>
        <div className='py-4'>
          <div className='flex flex-row justify-between w-full mb-1 sm:mb-0 '>
            <h2 className='text-2xl leading-tight hidden md:block'>Usuários</h2>
            <div className='flex justify-center  md:justify-end w-full'>
              <form className='flex flex-row items-center md:justify-end gap-2  w-full '>
                <div className=''>
                  <TextInput.Root>
                    <TextInput.Icon>
                      <FileSearch />
                    </TextInput.Icon>
                    <TextInput.Input placeholder='Nome' />
                  </TextInput.Root>
                </div>
                <Button variant='info'>
                  <MagnifyingGlass />
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className='w-full bg-white max-h-[calc(100vh-15rem)] shadow-lg rounded-2xl dark:bg-gray-700'>
          {stateComponent[isLoading ? 'loading' : data ? 'list' : 'noregister']}
        </div>
      </div>
    </Layout>
  );
}
