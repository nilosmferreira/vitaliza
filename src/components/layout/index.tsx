import { ReactNode } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';

interface LayoutProps {
  children: ReactNode;
}
export function Layout({ children }: LayoutProps) {
  return (
    <main className='relative h-screen overflow-hidden bg-green-50 dark:bg-gray-800 rounded-2xl'>
      <div className='flex items-start justify-between'>
        <Sidebar />
        <div className='flex flex-col w-full pl-0 md:p-4 md:space-y-4'>
          <Header />
          <div className='h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0'>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
