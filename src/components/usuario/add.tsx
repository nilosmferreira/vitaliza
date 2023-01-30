import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeSlash } from 'phosphor-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../form/button';
import { Label } from '../form/label';
import { TextInput } from '../form/text-input';

const dataSchema = z
  .object({
    userName: z
      .string({
        required_error: 'Campo é obrigatório',
      })
      .min(3, {
        message: 'Deve ter 3 ou mais caracteres',
      })
      .max(20, {
        message: 'Deve ter menos de 20 caracteres',
      }),
    firstName: z.string({
      required_error: 'Campo é obrigatório',
    }),
    lastName: z.string({
      required_error: 'Campo é obrigatório',
    }),
    email: z
      .string({
        required_error: 'Campo é obrigatório',
      })
      .email({
        message: 'Não é um e-mail válido',
      }),
    password: z.string({
      required_error: 'Campo é obrigatório',
    }),
    passwordConfirm: z.string({
      required_error: 'Campo é obrigatório',
    }),
    roles: z.array(z.string()),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Senhas não conferem',
    path: ['password', 'passwordConfirm'],
  });
export function AddUser() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof dataSchema>>({
    mode: 'all',
    resolver: zodResolver(dataSchema),
  });

  const handleOnSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className='container mx-auto px-2 sm:px-4 max-w-3xl '>
      <h1 className='font-medium py-2'>Incluir Usuário</h1>
      <form
        onSubmit={handleOnSubmit}
        className='relative h-full flex flex-col justify-between bg-white shadow-lg rounded-lg overflow-hidden'
      >
        <div className='p-4 space-y-2'>
          <div>
            <Label htmlFor='userName'>Usuário</Label>
            <TextInput.Root error={errors['userName']}>
              <TextInput.Input
                type='text'
                {...register('userName')}
              />
            </TextInput.Root>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div>
              <Label htmlFor='firstName'>Primeiro Nome</Label>
              <TextInput.Root error={errors['firstName']}>
                <TextInput.Input
                  {...register('firstName')}
                  type='text'
                />
              </TextInput.Root>
            </div>
            <div>
              <Label htmlFor='lastName'>Sobrenome</Label>
              <TextInput.Root error={errors['lastName']}>
                <TextInput.Input
                  {...register('lastName')}
                  type='text'
                />
              </TextInput.Root>
            </div>
          </div>
          <div>
            <Label htmlFor='email'>e-mail</Label>
            <TextInput.Root error={errors['email']}>
              <TextInput.Input
                {...register('email')}
                type='email'
              />
            </TextInput.Root>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div>
              <Label htmlFor='password'>senha</Label>
              <TextInput.Root error={errors['password']}>
                <TextInput.Input
                  {...register('password')}
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
              <Label htmlFor='passwordConfirm'>Confirmação</Label>
              <TextInput.Root error={errors['passwordConfirm']}>
                <TextInput.Input
                  {...register('passwordConfirm')}
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
  );
}
