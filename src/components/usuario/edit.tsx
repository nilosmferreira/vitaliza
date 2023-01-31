import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from '../form/label';
import { TextInput } from '../form/text-input';
import { z } from 'zod';
import { Button } from '../form/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/infra/axios';
import { useRouter } from 'next/router';
import { Loading } from '../loading';
import clsx from 'clsx';

interface EditUserProps {
  id: string;
}
const dataSchema = z.object({
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
});
type updateData = z.infer<typeof dataSchema>;
export function EditUser() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { type } = router.query;
  let id: string;
  id = String(type);

  const { mutate, isLoading: loadingMutation } = useMutation({
    mutationFn: (data: updateData) => {
      return api.put('/api/controle/usuario', data);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['user']);
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: [`user`],
    queryFn: async () => {
      try {
        const { data } = await api.get<updateData>(
          `/api/controle/usuario/encontrar/id/${id}`
        );
        return {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        };
      } catch (error) {
        return null;
      }
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
  });

  if (isLoading) {
    return (
      <div className='container mx-auto px-2 sm:px-4 max-w-3xl '>
        <div
          className={clsx(
            'relative h-container flex flex-col justify-between bg-white shadow-lg rounded-lg',
            'overflow-hidden fill-green-600 items-center p-10'
          )}
        >
          <Loading />
        </div>
      </div>
    );
  }
  if (data) {
    setValue('email', data.email);
    setValue('firstName', data.firstName);
    setValue('lastName', data.lastName);
    setFocus('firstName');
  }

  const handleOnSubmit = handleSubmit((data) => {
    mutate(data);
  });
  return (
    <div className='container mx-auto px-2 sm:px-4 max-w-3xl '>
      <h1 className='font-medium py-2'>Atualizar Usuário</h1>
      <form
        onSubmit={handleOnSubmit}
        className='relative h-full flex flex-col justify-between bg-white shadow-lg rounded-lg overflow-hidden'
      >
        <div className='p-4 space-y-2'>
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
                disabled
                {...register('email')}
                type='email'
              />
            </TextInput.Root>
          </div>
        </div>
        <footer className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
          <Button
            variant='primary'
            type='submit'
            isLoading={loadingMutation}
          >
            Gravar
          </Button>
        </footer>
      </form>
    </div>
  );
}
