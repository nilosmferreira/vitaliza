import { Button } from '@/components/form/button';
import { TextInput } from '@/components/form/text-input';
import { LockSimple } from 'phosphor-react';

export default function Esqueceu() {
  return (
    <div className='h-screen w-screen bg-green-50 flex items-center justify-center'>
      <div className='relative container md:w-96 min-w-[320px]'>
        <form className='bg-white rounded-lg overflow-hidden shadow-md space-y-3'>
          <div className='flex flex-col justify-center items-center space-x-4 gap-3'>
            <div className='mt-4 rounded-full border-2 border-black p-2'>
              <LockSimple
                size={40}
                className=''
              />
            </div>
            <h1 className='font-serif text-2xl font-bold text-gray-600'>
              Problemas para entrar?
            </h1>
            <span className='font-serif text-base text-gray-500 text-center py-5'>
              Insira seu email e enviaremos um link para você voltar acessar a
              sua conta.
            </span>
            <div className=''>
              <TextInput.Root>
                <TextInput.Input placeholder='joedoe@joedoecia.com' />
              </TextInput.Root>
            </div>
            <div className='mb-10'>
              <Button variant='primary'>Enviar link para login</Button>
            </div>
          </div>
          <footer className='bg-gray-50 px-4 py-3 text-center sm:px-6'>
            <a href='/'>Voltar ao login</a>
          </footer>
        </form>
      </div>
    </div>
  );
}
