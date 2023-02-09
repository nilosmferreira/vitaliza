import { Button } from '@/components/form/button';
import { Layout } from '@/components/layout';
import { ListaPadrao } from '@/components/lista';
import { Loading } from '@/components/loading';
import { api } from '@/infra/axios';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { PencilSimple } from 'phosphor-react';
import * as Avatar from '@radix-ui/react-avatar';
import { PessoaIcon } from '@/components/icons/pessoa-icon';
import { z } from 'zod';

const colaboradoresSchema = z.array(
  z.object({
    apelido: z.string(),
    avatar: z.string().nullable(),
    id: z.string(),
    telefone: z
      .string()
      .nullable()
      .transform((value) =>
        value?.replace(/(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
      ),
    celular: z
      .string()
      .nullable()
      .transform((value) =>
        value?.replace(/(\d{2})(\d)(\d{4})(\d{4})$/, '($1)  $2 $3-$4')
      ),
  })
);
interface ColaboradorResponse {
  data: {
    apelido: string;
    avatar: string;
    id: string;
    telefone: string;
    celular: string;
  }[];
  count: number;
}
export default function Colaborador() {
  const {
    data,
    isError: isErrorResponse,
    error: errorResponse,
    isLoading: isLoadingResponse,
  } = useQuery({
    queryKey: ['lista-colaborador'],
    queryFn: async () => {
      const { data } = await api.get<ColaboradorResponse>(
        '/api/controle/colaborador'
      );
      const dataArray = colaboradoresSchema.parse(data.data);
      return { data: dataArray, count: data.count };
    },
  });

  const components = {
    isLoading: (
      <div className='table-row '>
        <div className='absolute w-full h-52 flex items-center justify-center fill-green-600 bg-white border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
          <Loading />
        </div>
      </div>
    ),
    isError: (
      <div className='table-row '>
        <span>{'occo'}</span>
      </div>
    ),
    noRegister: (
      <div className='table-row'>
        <div className='absolute w-full h-52 flex items-center justify-center bg-white border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>
          <h1 className='text-2xl font-bold text-center'>
            Nenhum registro encontrado
          </h1>
        </div>
      </div>
    ),
    data: (
      <>
        {data?.data.map(({ id, apelido, telefone, celular, avatar }) => (
          <div
            key={id}
            className='table-row '
          >
            <div className='table-cell border-b border-slate-100 dark:border-slate-700  pl-8 text-slate-500 dark:text-slate-400'>
              <div>
                <div className='absolute w-10 h-10 -mt-3 text-cyan-600 border bg-green-50 rounded-full'>
                  {avatar ? (
                    <Avatar.Root>
                      <Avatar.Image
                        className='rounded-full'
                        src={`/api/avatar/${avatar}`}
                      />
                    </Avatar.Root>
                  ) : (
                    <PessoaIcon />
                  )}
                </div>
                <span className='ml-14'>{apelido}</span>
              </div>
            </div>
            <div className='hidden md:table-cell border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400'>
              {telefone}
            </div>
            <div className='hidden md:table-cell border-b border-slate-100 p-4  text-slate-500'>
              {celular}
            </div>
            <div className='table-cell border-b border-slate-100  justify-end text-slate-500 '>
              <div className='p-4 flex flex-row h-full justify-end gap-2'>
                <Link href={`/controle/colaborador/${id}`}>
                  <PencilSimple
                    size={20}
                    className='text-blue-600'
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </>
    ),
  };

  let currentComponent: JSX.Element;

  if (isLoadingResponse) {
    currentComponent = components['isLoading'];
  } else if (isErrorResponse) {
    currentComponent = components['isError'];
  } else if (data) {
    currentComponent =
      data.count === 0 ? components['noRegister'] : components['data'];
  } else {
    currentComponent = components['isLoading'];
  }
  return (
    <Layout>
      <ListaPadrao title='Colaborador'>
        <div
          className={clsx('relative bg-green-100  rounded-xl overflow-auto', {
            'min-h-[320px]': isLoadingResponse || data?.count === 0,
          })}
        >
          <div className='shadow-sm overflow-hidden my-8'>
            <div className='table border-collapse table-auto w-full text-sm'>
              <div className='table-header-group '>
                <div className='table-row'>
                  <div className='table-cell border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left'>
                    Nome
                  </div>
                  <div className='md:table-cell hidden border-b font-medium p-4 pt-0 pb-3 text-slate-400  text-left'>
                    Telefone
                  </div>
                  <div className='md:table-cell hidden border-b font-medium p-4 pt-0 pb-3 text-slate-400  text-left'>
                    Celular
                  </div>
                  <div className='table-cell border-b font-medium p-4 pr-8 pt-1 pb-3 text-slate-400  text-left'>
                    <Link
                      href='/controle/colaborador/novo'
                      className='flex justify-end'
                    >
                      <Button variant='primary'>Novo</Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='table-row-group bg-white dark:bg-slate-800'>
                {currentComponent}
                {/* {data?.users?.map(({ id, name, email, isActive }) => (
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
                        className={clsx(
                          'px-2 py-1 rounded-full font-semibold',
                          {
                            'text-white bg-green-600': isActive,
                            'text-white bg-red-600': !isActive,
                          }
                        )}
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
                ))} */}
              </div>
            </div>
          </div>
          <div className='mx-auto w-full my-8 pl-8'>
            {/* <Paginacao
              resultsCount={data?.count}
              limit={perPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPage={perPage}
              setPerPage={setPerPage}
            /> */}
          </div>
        </div>
      </ListaPadrao>
    </Layout>
  );
}
