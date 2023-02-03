import { useAuth } from '@/application/hooks/use-auth';
import * as Avatar from '@radix-ui/react-avatar';
import clsx from 'clsx';

export function Profile() {
  const { user } = useAuth();
  if (!user) {
    return <h1>Carregando...</h1>;
  }
  const iniciais = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  return (
    <div className='flex flex-row items-center'>
      <Avatar.Root className='relative inline-flex h-10 w-10 md:mr-2'>
        <Avatar.AvatarFallback
          className={clsx(
            'flex h-full w-full items-center justify-center bg-green-600 rounded-full '
          )}
        >
          <span className='text-sm font-medium uppercase text-white'>
            {iniciais}
          </span>
        </Avatar.AvatarFallback>
        {user.avatar && (
          <Avatar.AvatarImage
            src={`/api/avatar/${user.avatar}`}
            className={clsx(
              'flex h-full w-full items-center justify-center bg-green-600 rounded-full '
            )}
          />
        )}
      </Avatar.Root>
      <div className='hidden md:flex flex-col font-thin text-xs'>
        <span className='text-gray-800'>{`${user.firstName} ${user.lastName}`}</span>
        <span className='text-gray-600'>{user.email}</span>
      </div>
    </div>
  );
}
