import * as Check from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { Check as CheckIcon } from 'phosphor-react';

interface CheckboxProps {
  children: string;
  state: boolean;
  changeState: (value: boolean) => void;
}
export const CheckBox = ({ children, state, changeState }: CheckboxProps) => {
  return (
    <Check.Root
      className='flex items-center gap-3 group focus:outline-none ml-2 mt-1'
      checked={state}
      onCheckedChange={changeState}
    >
      <div className='flex justify-center space-x-2'>
        <div
          className={clsx(
            'h-6 w-6 rounded-lg flex items-center justify-center bg-blue-50 border-2',
            'border-blue-500 group-data-[state=checked]:bg-blue-500 group-data-[state=checked]:border-blue-50',
            'transition-colors group-focus:ring-1 group-focus:ring-blue-600 group-focus:ring-offset-1',
            'group-focus:ring-offset-background'
          )}
        >
          <Check.Indicator>
            <CheckIcon
              size={20}
              className='text-white'
            />
          </Check.Indicator>
        </div>

        <span className='text-gray-500 leading-tight'>{children}</span>
      </div>
    </Check.Root>
  );
};
