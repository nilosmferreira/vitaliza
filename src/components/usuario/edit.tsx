import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from '../form/label';
import { TextInput } from '../form/text-input';
import { z } from 'zod';
import { Button } from '../form/button';

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
export function EditUser({ id }: EditUserProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof dataSchema>>({
    mode: 'all',
    resolver: zodResolver(dataSchema),
  });
  return (
    <div className='container mx-auto px-2 sm:px-4 max-w-3xl '>
      <h1 className='font-medium py-2'>Atualizar Usuário</h1>
      <form
        // onSubmit={onSubmit}
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
          >
            Gravar
          </Button>
        </footer>
      </form>
    </div>
  );
}
