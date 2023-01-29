import clsx from 'clsx';
import { ActiveLink } from '../active-link';
interface NavItemProps {
  href: string;
  title: string;
  icon: JSX.Element;
}
export function NavItem({ href, title, icon }: NavItemProps) {
  return (
    <ActiveLink
      href={href}
      passHref
    >
      <div
        className={clsx(
          'flex items-center justify-start w-full p-4 my-2 font-normal uppercase',
          'data-[active=true]:text-green-500  transition-colors duration-200 data-[active=true]:border-r-4 data-[active=true]:border-green-500 data-[active=true]:bg-gradient-to-r',
          'data-[active=true]:from-white data-[active=true]:to-green-100',
          'text-slate-500 hover:text-blue-500'
        )}
      >
        <span className='text-left w-5 h-5'>{icon}</span>
        <span className='mx-4 text-sm font-normal'>{title}</span>
      </div>
    </ActiveLink>
  );
}
