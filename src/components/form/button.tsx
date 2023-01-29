import {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react';
import clsx from 'clsx';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-danger'
    | 'circulate-success';
}

const ButtonBase: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonBaseProps
> = ({ variant = 'primary', children, isLoading, type, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        'inline-flex justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 py-2 px-4 text-sm font-medium group',
        {
          'bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-blue-700':
            variant === 'primary',
          'border-2 border-blue-500 text-gray-800 rounded-md  hover:bg-blue-500 hover:text-white focus:ring-blue-700':
            variant === 'outline-primary',

          'bg-cyan-500 text-white rounded-md  hover:bg-cyan-600 focus:ring-cyan-700':
            variant === 'info',
          'border-2 border-cyan-500 rounded-md text-gray-800 hover:bg-cyan-500 hover:text-white focus:ring-cyan-700':
            variant === 'outline-info',

          'bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring-gray-700':
            variant === 'secondary',
          'border-2 border-gray-500 rounded-md text-gray-800 hover:bg-gray-500 hover:text-white focus:ring-gray-700':
            variant === 'outline-secondary',

          'bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-green-700':
            variant === 'success',
          'border-2 border-green-500 rounded-md text-gray-800 hover:bg-green-500 hover:text-white focus:ring-green-700':
            variant === 'outline-success',
          'rounded-full border-2 border-green-500 text-gray-800 hover:bg-green-500 hover:text-white focus:ring-green-700':
            variant === 'circulate-success',
          'bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring-red-700':
            variant === 'danger',
          'border-2 border-red-500 rounded-md text-gray-800 hover:bg-red-500 hover:text-white focus:ring-red-700':
            variant === 'outline-danger',

          'bg-yellow-400 text-white rounded-md hover:bg-yellow-500 focus:ring-yellow-600':
            variant === 'warning',
          'border-2 border-yellow-400 rounded-md text-gray-800 hover:bg-yellow-400 hover:text-white focus:ring-yellow-600':
            variant === 'outline-warning',
        }
      )}
      {...rest}
    >
      {isLoading && (
        <svg
          width='20'
          height='20'
          fill='currentColor'
          className='mr-2 animate-spin'
          viewBox='0 0 1792 1792'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z'></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export const Button = forwardRef(ButtonBase);
