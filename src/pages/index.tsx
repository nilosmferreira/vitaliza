import { Button } from '@/components/form/button';
import { TextInput } from '@/components/form/text-input';
import { Eye, EyeClosed, Lock } from 'phosphor-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '@/application/hooks/use-auth';
import { Toast } from '@/components/toast';
import { useRouter } from 'next/router';

const formDataSchema = z.object({
  usuario: z
    .string({
      required_error: 'Campo usuário é obrigatório!',
    })
    .min(1, 'Campo usuário é obrigatório!'),
  senha: z
    .string({
      required_error: 'Campo senha é obrigatório!',
    })
    .min(1, 'Campo senha é obrigatório!'),
});
export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>();
  const { replace } = useRouter();
  const { signIn } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
  });

  const handleCloseToast = () => {
    if (error) setError(undefined);
  };
  const handleOnSubmit = handleSubmit(async (data) => {
    try {
      await signIn(data.usuario, data.senha);
      replace('/controle');
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  });
  return (
    <div className='h-screen w-screen bg-green-50 flex items-center justify-center'>
      <div className='relative container md:w-96 min-w-[320px]'>
        <div className='absolute -top-6 flex items-center justify-center w-full'>
          <Lock className='w-12 h-12 bg-white ring-4 ring-green-50 text-green-700 rounded-full' />
        </div>
        <form
          onSubmit={handleOnSubmit}
          className='bg-white rounded-lg overflow-hidden shadow-md space-y-3'
        >
          <div className='p-6 space-y-3'>
            <div className='space-y-1'>
              <label
                htmlFor='usuario'
                className='text-sm text-gray-600'
              >
                Usuário
              </label>
              <TextInput.Root error={errors['usuario']}>
                <TextInput.Input
                  type='text'
                  {...register('usuario')}
                />
              </TextInput.Root>
            </div>
            <div className='space-y-1'>
              <label
                htmlFor='usuario'
                className='text-sm text-gray-600 mb-2'
              >
                Senha
              </label>
              <TextInput.Root error={errors['senha']}>
                <TextInput.Input
                  {...register('senha')}
                  type={showPassword ? 'text' : 'password'}
                />
                <TextInput.Icon className='group hover:cursor-pointer'>
                  {showPassword ? (
                    <Eye onClick={() => setShowPassword(false)} />
                  ) : (
                    <EyeClosed onClick={() => setShowPassword(true)} />
                  )}
                </TextInput.Icon>
              </TextInput.Root>
            </div>
            <div className='flex flex-row items-center justify-between '>
              <div className='flex justify-center items-center'>
                <input
                  type='checkbox'
                  name='permite'
                  id='permite'
                  className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-0'
                />
                <label
                  htmlFor='permite'
                  className='text-sm ml-1'
                >
                  Lembrar o usuário
                </label>
              </div>
              <a
                href='#'
                className='text-sm text-blue-500 hover:text-blue-700 transition-colors delay-75 focus:outline-none  rounded-md focus:ring-blue-500 focus:ring-1'
              >
                Esqueci a senha?
              </a>
            </div>
          </div>
          <footer className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
            <Button
              variant='primary'
              type='submit'
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
          </footer>
        </form>
        <Toast
          open={error !== undefined}
          title='Login'
          handleClose={handleCloseToast}
        >
          <span className='text-red-700 font-bold text-lg p-2'>{error}</span>
        </Toast>
      </div>
    </div>
  );
}
