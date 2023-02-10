import { api } from '@/infra/axios';
import { useQuery } from '@tanstack/react-query';
import { SpinnerGap } from 'phosphor-react';

interface UsuarioData {
  results: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  }[];
  count: number;
  limit: number;
  page: number;
}
export function DashboardUsuarios() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['dashboard-usuarios'],
    queryFn: async () => {
      const { data } = await api.get<UsuarioData>('/api/controle/usuario');
      return data;
    },
  });
  return (
    <div className='mx-0 mb-4 sm:ml-4 xl:mr-4'>
      <div className='w-full bg-white h-96 shadow-lg rounded-2xl dark:bg-gray-700'>
        {isLoading ? (
          <SpinnerGap
            size={40}
            className='animate-spin'
          />
        ) : data ? (
          <>
            <p className='p-4 font-bold text-black text-md dark:text-white'>
              Usuarios
              <span className='ml-2 text-sm text-gray-500 dark:text-gray-300 '>
                ({data.count})
              </span>
            </p>
            <ul>
              {data.results.map(({ id, firstName, lastName, email }, index) => (
                <li
                  key={id}
                  className='flex items-center justify-between py-3 text-gray-600 border-b-2 border-green-100 even:bg-green-50'
                >
                  <div className='flex items-center justify-start text-sm'>
                    <span className='mx-4'>
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className='w-28'>{`${firstName} ${lastName}`}</span>
                    <span>{email}</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className='relative w-full h-full flex items-center justify-center'>
            <span>Sem registros</span>
          </div>
        )}
      </div>
    </div>
  );
}
