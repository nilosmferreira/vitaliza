import { Button } from '@/components/form/button';
import { Label } from '@/components/form/label';
import { TextInput } from '@/components/form/text-input';
import { Layout } from '@/components/layout';
import { Toast } from '@/components/toast';
import { api } from '@/infra/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Eye, EyeSlash } from 'phosphor-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const dataSchema = z
  .object({
    current_password: z.string(),
    new_password: z.string().min(1, {
      message: 'Campo é obrigatório',
    }),
    confirm_new_password: z.string().min(1, {
      message: 'Campo é obrigatório',
    }),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: 'Senhas não conferem',
    path: ['new_password'],
  });
export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<JSX.Element>();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
  });
  const handleOnSubmit = handleSubmit(async (data) => {
    try {
      await api.post('/api/controle/usuario/trocasenha', {
        currentPassword: data.current_password,
        newPassword: data.new_password,
        confirmPassword: data.confirm_new_password,
      });
      setMessage(
        <span className='text-green-700 font-bold text-lg p-2'>
          Senha alterada com sucesso!
        </span>
      );

      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data;
        setMessage(
          <span className='text-red-700 font-bold text-lg p-2'>{message}</span>
        );
      }
    }
  });
  return (
    <Layout>
      <div className='container mx-auto px-2 sm:px-4 max-w-3xl '>
        <h1 className='font-medium py-2'>Troca senha</h1>
        <form
          onSubmit={handleOnSubmit}
          className='relative h-full flex flex-col justify-between bg-white shadow-lg rounded-lg overflow-hidden'
        >
          <div className='p-4 space-y-2'>
            <div>
              <Label htmlFor='current_password'>Senha antiga</Label>
              <TextInput.Root error={errors['current_password']}>
                <TextInput.Input
                  {...register('current_password')}
                  type={showPassword ? 'text' : 'password'}
                />
                <TextInput.Icon className='group hover:cursor-pointer'>
                  {showPassword ? (
                    <Eye onClick={() => setShowPassword(false)} />
                  ) : (
                    <EyeSlash onClick={() => setShowPassword(true)} />
                  )}
                </TextInput.Icon>
              </TextInput.Root>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              <div>
                <Label htmlFor='new_password'>Nova senha</Label>
                <TextInput.Root error={errors['new_password']}>
                  <TextInput.Input
                    {...register('new_password')}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <TextInput.Icon className='group hover:cursor-pointer'>
                    {showPassword ? (
                      <Eye onClick={() => setShowPassword(false)} />
                    ) : (
                      <EyeSlash onClick={() => setShowPassword(true)} />
                    )}
                  </TextInput.Icon>
                </TextInput.Root>
              </div>
              <div>
                <Label htmlFor='confirm_new_password'>
                  Confirmação da nova senha
                </Label>
                <TextInput.Root error={errors['confirm_new_password']}>
                  <TextInput.Input
                    {...register('confirm_new_password')}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <TextInput.Icon className='group hover:cursor-pointer'>
                    {showPassword ? (
                      <Eye onClick={() => setShowPassword(false)} />
                    ) : (
                      <EyeSlash onClick={() => setShowPassword(true)} />
                    )}
                  </TextInput.Icon>
                </TextInput.Root>
              </div>
            </div>
          </div>
          <footer className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
            <Button
              variant='primary'
              type='submit'
            >
              Gravar
            </Button>
          </footer>
        </form>
      </div>
      <Toast
        open={message !== undefined}
        handleClose={() => setMessage(undefined)}
        title='Troca Senha'
      >
        {message}
      </Toast>
    </Layout>
  );
}
