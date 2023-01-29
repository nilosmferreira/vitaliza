import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { List, X } from 'phosphor-react';
import { Sidebar } from '../sidebar';
import { NavBar } from '../sidebar/navbar';
import { Profile } from './profile';

export function Header() {
  return (
    <Popover.Root>
      <header className='z-40 items-center w-full h-16 bg-white shadow-lg dark:bg-gray-700 rounded-2xl'>
        <div className='relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center'>
          <div className='relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0'>
            <div className='relative left-0 z-30 flex w-full h-auto justify-between lg:justify-end md:space-x-10'>
              <div className='my-2 lg:hidden'>
                <Popover.Trigger asChild>
                  <List size={20} />
                </Popover.Trigger>
              </div>
            </div>
            <div className='relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto'>
              <Profile />
            </div>
          </div>
        </div>
      </header>
      <Popover.Portal className='relative w-screen h-screen'>
        <Popover.Content
          className={
            clsx(
              'radix-side-right:animate-slide-right-fade radix-side-bottom:animate-slide-down',
              'absolute z-50 -top-10 -right-40 bg-green-300 h-screen lg:hidden',
              'rounded-lg ring-0 w-48 md:w-56 md:-right-48'
            )
            // 'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            // 'absolute  z-40 lg:hidden',
            // 'z-50 w-48 shadow-md md:w-56',
            // 'bg-green-300 h-screen dark:bg-gray-800',
            // 'ring-0 rounded-lg'
          }
        >
          <NavBar menu />
          <Popover.Close
            className={clsx(
              'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
              'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <X className='h-6 w-6 text-stone-500 hover:text-blue-700 ' />
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
