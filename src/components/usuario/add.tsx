import { api } from '@/infra/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { CheckCircle, Eye, EyeSlash, XCircle } from 'phosphor-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../form/button';
import { Label } from '../form/label';
import { TextInput } from '../form/text-input';
import { Toast } from '../toast';

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
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Senhas não conferem',
    path: ['password', 'passwordConfirm'],
  });

interface FindFields {
  userName?: string;
  email?: string;
}
export function AddUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<JSX.Element | null>(null);
  const [username, setUsername] = useState<boolean | null>(null);
  const [email, setEmail] = useState<boolean | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setFocus,
    resetField,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
  });

  const handleOnSubmit = handleSubmit(
    async ({ email, firstName, lastName, userName, password }) => {
      try {
        await api.post('/api/controle/usuario', {
          userName,
          firstName,
          lastName,
          email,
          password,
        });
        setMessage(
          <span className='text-green-600 font-medium text-sm'>
            Gravado com sucesso!
          </span>
        );
        reset();
      } catch (error) {
        if (error instanceof AxiosError) {
          setMessage(
            <span className='text-red-600 font-medium text-sm'>
              {error.response?.data.message}
            </span>
          );
        }
      }
    }
  );
  const handleBlur = ({ userName, email }: FindFields) => {
    if ((userName && userName.length > 0) || (email && email.length > 0)) {
      api
        .get(
          `/api/controle/usuario/encontrar/${userName ? 'username' : 'email'}/${
            userName ?? email
          }`
        )
        .then((res) => {
          const valid = res.data === null;
          userName ? setUsername(valid) : setEmail(valid);
          if (!valid) {
            if (userName) {
              setFocus('userName');
              setError('userName', {
                message: 'Usuário já existe!',
              });
            } else {
              setFocus('email');
              setError('email', {
                message: 'email já existe!',
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      clearErrors('userName');
      setUsername(null);
      clearErrors('email');
      setEmail(null);
    }
  };

  return (
    <div className='container mx-auto px-2 sm:px-4 max-w-3xl '>
      <h1 className='font-medium py-2'>Incluir Usuário</h1>
      <form
        onSubmit={handleOnSubmit}
        className='relative h-full flex flex-col justify-between bg-white shadow-lg rounded-lg overflow-hidden'
      >
        <div className='p-4 space-y-2'>
          <div className='flex flex-row  gap-2'>
            <div className='w-full'>
              <Label htmlFor='userName'>Usuário</Label>
              <TextInput.Root error={errors['userName']}>
                <TextInput.Input
                  type='text'
                  {...register('userName', {
                    onBlur: (ev) => handleBlur({ userName: ev.target.value }),
                  })}
                />
              </TextInput.Root>
            </div>
            {username !== null ? (
              username ? (
                <CheckCircle
                  size={30}
                  weight='bold'
                  className='text-green-700 mt-7'
                />
              ) : (
                <XCircle
                  size={30}
                  weight='bold'
                  className='text-red-700 mt-7'
                />
              )
            ) : null}
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
          <div className='flex flex-row  gap-2'>
            <div className='w-full'>
              <Label htmlFor='email'>e-mail</Label>
              <TextInput.Root error={errors['email']}>
                <TextInput.Input
                  {...register('email', {
                    onBlur: (ev) => handleBlur({ email: ev.target.value }),
                  })}
                  type='email'
                />
              </TextInput.Root>
            </div>
            {email !== null ? (
              email ? (
                <CheckCircle
                  size={30}
                  weight='bold'
                  className='text-green-700 mt-7'
                />
              ) : (
                <XCircle
                  size={30}
                  weight='bold'
                  className='text-red-700 mt-7'
                />
              )
            ) : null}
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
      <Toast
        open={message !== null}
        handleClose={() => setMessage(null)}
        title='Novo Usuário'
      >
        {message}
      </Toast>
    </div>
  );
}
