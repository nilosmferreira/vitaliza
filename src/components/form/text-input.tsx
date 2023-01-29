import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import { FieldError } from 'react-hook-form';
import clsx from 'clsx';
import { Warning } from 'phosphor-react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextInputIconProps {
  children: React.ReactNode;
  className?: string;
}
export interface TextInputRoot {
  children: React.ReactNode;
  error?: FieldError;
}
function Root({ children, error }: TextInputRoot) {
  return (
    <>
      <div className='flex items-center gap-3 py-2 px-3 rounded-md border border-gray-600 bg-gray-100 w-full focus-within:outline-none  focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-transparent'>
        {children}
      </div>
      {error ? (
        <div
          className='flex p-4 mb-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400'
          role='alert'
        >
          <Warning className='w-5 h-5 mr-2' />
          <span className='sr-only'>Info</span>
          <div>
            <span className='font-medium'>{error.message}</span>
            {/* <ul className='mt-1.5 ml-4 list-disc list-inside'>
              <li>At least 10 characters (and up to 100 characters)</li>
              <li>At least one lowercase character</li>
              <li>
                Inclusion of at least one special character, e.g., ! @ # ?
              </li>
            </ul> */}
          </div>
        </div>
      ) : null}
    </>
  );
}
Root.displayName = 'TextInput.Root';
const InputBase: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  props,
  ref
) => {
  return (
    <input
      ref={ref}
      className='bg-transparent flex-1 text-gray-700 placeholder:text-gray-400 outline-none disabled:text-gray-400 disabled:cursor-not-allowed 
  '
      {...props}
    />
  );
};
// function Input(props: TextInputProps) {
//   return (
//     <input
//       className='bg-transparent flex-1 text-gray-700 placeholder:text-gray-400 outline-none disabled:text-gray-400 disabled:cursor-not-allowed
//   '
//       {...props}
//     />
//   );
// }
InputBase.displayName = 'TextInput.Input';
function Icon({ children, className }: TextInputIconProps) {
  return (
    <Slot className={clsx('w-6 h-6 text-gray-400', { className })}>
      {children}
    </Slot>
  );
}
Icon.displayName = 'TextInput.Icon';
const Input = forwardRef(InputBase);
export const TextInput = {
  Root,
  Icon,
  Input,
};
