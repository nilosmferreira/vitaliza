import { api } from '@/infra/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Check, X } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { boolean, z } from 'zod';
import { FormPadrao } from '../form-padrao';
import { Button } from '../form/button';
import { Label } from '../form/label';
import { TextInput } from '../form/text-input';
const cargoSchema = z.object({
  nome: z.string(),
});

type cargo = z.infer<typeof cargoSchema>;
interface CargoDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
export function CargoDialog({ isOpen, setIsOpen }: CargoDialogProps) {
  const {
    clearErrors,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(cargoSchema),
  });
  const { data: cargos, isLoading: isLoadingQuery } = useQuery({
    queryKey: ['lista-cargos'],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ id: string; name: string }[]>(
          '/api/controle/cargo'
        );
        return data.map((item) => ({
          id: item.id,
          nome: item.name,
        }));
      } catch (error) {
        throw error;
      }
    },
  });
  useMutation({
    mutationFn: (data) => {},
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Dialog.Portal>
        <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0 z-40' />
        <Dialog.Content className='absolute z-50 p-10 bg-green-50 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Dialog.Close className='absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-900'>
            <X
              size={24}
              aria-label='fechar'
            />
          </Dialog.Close>
          <Dialog.Title className='text-3xl leading-tight font-extrabold'>
            Cargos
          </Dialog.Title>
          <FormPadrao
            handleSubmit={onSubmit}
            footer={
              <footer className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <Button
                  variant='primary'
                  type='submit'
                >
                  Gravar
                </Button>
              </footer>
            }
            title='Adicionar Cargo'
          >
            <div>
              <Label htmlFor='nome'>Nome</Label>
              <TextInput.Root>
                <TextInput.Input {...register('nome')} />
              </TextInput.Root>
            </div>
          </FormPadrao>
          <div className='flex flex-col gap-2 mt-3'>
            {cargos?.map(({ id, nome }) => {
              return (
                <Checkbox.Root
                  key={id}
                  className='flex items-center gap-3 group focus:outline-none'
                  // checked={weekDays.includes(index)}
                  // onCheckedChange={() => handleToggleWeekDay(index)}
                >
                  <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                    <Checkbox.Indicator>
                      <Check
                        size={20}
                        className='text-white'
                      />
                    </Checkbox.Indicator>
                  </div>

                  <span className='text-white leading-tight'>{nome}</span>
                </Checkbox.Root>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
