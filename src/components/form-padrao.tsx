import { FormEventHandler, ReactNode } from 'react';

interface FormPadraoProps {
  title: string;
  children: ReactNode;
  footer: ReactNode;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}
export function FormPadrao({
  title,
  children,
  footer,
  handleSubmit,
}: FormPadraoProps) {
  return (
    <div className='container mx-auto px-2 sm:px-4 max-w-3xl '>
      <h1 className='font-medium py-2'>{title}</h1>
      <form
        onSubmit={handleSubmit}
        className='relative h-full flex flex-col justify-between bg-white shadow-lg rounded-lg overflow-hidden'
      >
        <div className='p-4 space-y-2'>{children}</div>
        {footer}
      </form>
    </div>
  );
}
