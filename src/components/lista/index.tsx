import { FileSearch, MagnifyingGlass } from 'phosphor-react';
import { ReactNode } from 'react';
import { Button } from '../form/button';
import { TextInput } from '../form/text-input';

interface ListaDefaultProps {
  title: string;
  children: JSX.Element;
}
export function ListaDefault({ title, children }: ListaDefaultProps) {
  return (
    <div className='container  mx-auto px-2 sm:px4 max-w-4xlxl'>
      <div className='py-4'>
        <div className='flex flex-row justify-between w-full mb-1 sm:mb-0 '>
          <h2 className='text-2xl leading-tight hidden md:block'>{title}</h2>
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
        {children}
      </div>
    </div>
  );
}
