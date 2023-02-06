import { api } from '@/infra/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, X } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormPadrao } from '../form-padrao';
import { Button } from '../form/button';
import { Label } from '../form/label';
import { TextInput } from '../form/text-input';
import clsx from 'clsx';
const cargoSchema = z.object({
  nome: z.string(),
});

type Cargo = z.infer<typeof cargoSchema>;
interface CargoDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  occupations: Array<string>;
  onOccupationsChange: (cargo: { nome: string }) => void;
}

interface RequestPostCargo {
  nome: string;
}
export function CargoDialog({
  isOpen,
  setIsOpen,
  occupations,
  onOccupationsChange,
}: CargoDialogProps) {
  const queryClient = useQueryClient();
  const {
    clearErrors,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Cargo>({
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
  const { mutate } = useMutation({
    mutationFn: (data: RequestPostCargo) =>
      api.post('/api/controle/cargo', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['lista-cargos']);
      reset();
    },
  });
  const onSubmit = handleSubmit((data) => mutate(data));
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
          <ScrollArea.Root className='flex flex-col gap-2 bg-white rounded-xl shadow-xl px-2 py-3 mt-3 h-36 overflow-hidden'>
            <h1>Cargos</h1>
            <ScrollArea.Viewport className='h-full w-full relative '>
              {cargos?.map(({ id, nome }) => {
                return (
                  <Checkbox.Root
                    key={id}
                    className='flex items-center gap-3 group focus:outline-none ml-2 mt-1'
                    checked={occupations.includes(nome)}
                    onCheckedChange={() => onOccupationsChange({ nome })}
                  >
                    <div className='flex justify-center space-x-2'>
                      <div className='h-6 w-6 rounded-lg flex items-center justify-center bg-green-50 border-2 border-green-500 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-1 group-focus:ring-violet-600 group-focus:ring-offset-1 group-focus:ring-offset-background'>
                        <Checkbox.Indicator>
                          <Check
                            size={20}
                            className='text-white'
                          />
                        </Checkbox.Indicator>
                      </div>

                      <span className='text-gray-500 leading-tight'>
                        {nome}
                      </span>
                    </div>
                  </Checkbox.Root>
                );
              })}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              orientation='vertical'
              className='flex p-1 duration-300 ease-out bg-gray-300 bg-opacity-20 hover:p-2'
            >
              <ScrollArea.Thumb
                className={clsx('bg-blue-500 rounded-full min-w-[10px]')}
              />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
          <div className='flex justify-center'>
            <Dialog.Close className=' mt-2 bg-red-500 text-white uppercase font-semibold border border-red-600 rounded-xl px-4 py-3 sm:px-6'>
              Sair
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
