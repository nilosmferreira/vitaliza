import clsx from 'clsx';
import * as Collapsible from '@radix-ui/react-collapsible';

import { ActiveLink } from '../active-link';
import { MenuItem } from './navbar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Colaborador from '@/pages/controle/colaborador';
import { CaretDown } from 'phosphor-react';
interface NavItemProps {
  href: string;
  title: string;
  icon: JSX.Element;
  exact: boolean;
  sub_menus?: MenuItem[];
}

export function NavItem({ href, title, icon, exact, sub_menus }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { asPath } = useRouter();

  if (!sub_menus)
    return (
      <ActiveLink
        href={href}
        passHref
        shouldMatchExactHref={exact}
      >
        <div
          className={clsx(
            'flex items-center justify-start w-full p-4 my-2 font-normal uppercase',
            'data-[active=true]:text-blue-500  transition-colors duration-200 data-[active=true]:border-r-4 data-[active=true]:border-blue-500 data-[active=true]:bg-gradient-to-r',
            'data-[active=true]:from-white data-[active=true]:to-blue-100',
            'text-slate-500 hover:text-blue-500'
          )}
        >
          <span className='text-left w-5 h-5'>{icon}</span>
          <span className='mx-4 text-sm font-normal'>{title}</span>
        </div>
      </ActiveLink>
    );
  let isActive = false;
  if (asPath.startsWith(String(href))) {
    isActive = true;
  }
  return (
    <Collapsible.Root>
      <Collapsible.Trigger className='group flex flex-row items-center justify-between w-full'>
        <div
          data-active={isActive}
          className={clsx(
            'flex items-center justify-start w-full p-4 my-2 font-normal uppercase group ',
            'data-[active=true]:text-blue-500  transition-colors duration-200 data-[active=true]:border-r-4 data-[active=true]:border-blue-500 data-[active=true]:bg-gradient-to-r',
            'data-[active=true]:from-white data-[active=true]:to-blue-100',
            'text-slate-500 hover:text-blue-500'
          )}
        >
          <span className='text-left w-5 h-5'>{icon}</span>
          <span className='mx-4 text-sm font-normal'>{title}</span>
          <CaretDown
            size={30}
            className='ml-20 text-slate-500 group-hover:text-blue-500 transform duration-300 ease-in-out group-radix-state-open:rotate-180'
          />
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className='data-[state=open]:animate-slide-down data-[state=close]:animate-slide-up'>
        {sub_menus.map((menu) => (
          <ActiveLink
            key={menu.href}
            href={menu.href}
            passHref
            shouldMatchExactHref={menu.href_exact}
          >
            <div
              className={clsx(
                'flex items-center justify-start w-full p-4 my-2 font-normal ',
                'data-[active=true]:text-blue-500  transition-colors duration-200 data-[active=true]:border-r-4 data-[active=true]:border-blue-500 data-[active=true]:bg-gradient-to-r',
                'data-[active=true]:from-white data-[active=true]:to-blue-100',
                'text-slate-500 hover:text-blue-500'
              )}
            >
              <span className='text-left w-5 h-5'> </span>
              <span className='mx-4 text-sm font-normal'>{menu.children}</span>
            </div>
          </ActiveLink>
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
