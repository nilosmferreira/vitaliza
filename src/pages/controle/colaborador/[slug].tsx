import { FormPadrao } from '@/components/form-padrao';
import { Button } from '@/components/form/button';
import { Label } from '@/components/form/label';
import { TextInput } from '@/components/form/text-input';
import { Layout } from '@/components/layout';
import { useRouter } from 'next/router';
import * as Scroll from '@radix-ui/react-scroll-area';
import clsx from 'clsx';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { CroppedImage } from '@/components/cropped-image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'phosphor-react';
import { CargoDialog } from '@/components/dialog/cargo-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/infra/axios';
import { GetServerSideProps } from 'next';
import { PrismaColaboradoresRepository } from '@/infra/database/prisma/repositories/prisma-colaboradores-repository';
import { PrismaColaboradoresMapper } from '@/infra/database/prisma/mapper/prisma-colaboradores-mapper';
import { ColaboradorViewModel } from '@/infra/http/colaborador-view-model';
import { Toast } from '@/components/toast';
import { AxiosError } from 'axios';

const colaboradorSchema = z.object({
  nome: z.string().min(1, {
    message: 'Campo é obrigatório',
  }),
  razao: z.string().nullish(),
  cep: z.string().min(1, {
    message: 'Campo é obrigatório',
  }),
  numero: z.string().nullish(),
  complemento: z.string().nullish(),
  cargos: z.array(z.string()).nullish().nullable(),
  telefone: z
    .string()
    .nullable()
    .transform((value) => {
      if (value) {
        if (value.length === 10) {
          value = value.replace(/(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        } else {
          value = value.replace(/(\d{2})(\d)(\d{4})(\d{4})$/, '($1)  $2 $3-$4');
        }
      }
      return value;
    }),
  celular: z
    .string()
    .nullable()
    .transform((value) => {
      if (value) {
        if (value.length === 10) {
          value = value.replace(/(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        } else {
          value = value.replace(/(\d{2})(\d)(\d{4})(\d{4})$/, '($1)  $2 $3-$4');
        }
      }
      return value;
    }),
  telefone_comercial: z.string().nullish().nullable(),
  logradouro: z.string(),
  cidade: z.string(),
  uf: z.string(),
  bairro: z.string(),
  avatar: z.string().nullish().nullable(),
});

type Colaborador = z.infer<typeof colaboradorSchema>;
type Occupation = {
  // id: string;
  nome: string;
};

const ViaCEPSchema = z.object({
  cep: z.string(),
  logradouro: z.string(),
  complemento: z.string(),
  bairro: z.string(),
  localidade: z.string(),
  uf: z.string(),
  // ibge: z.string(),
  // gia: z.string(),
  // ddd: z.string(),
  // siafi: z.string(),
});
type ViaCEP = z.infer<typeof ViaCEPSchema>;

interface ColaboradorCadEditProps {
  colaborador?: Colaborador;
  colaboradorId?: string;
}
export default function ColaboradorCadEdit({
  colaborador,
  colaboradorId,
}: ColaboradorCadEditProps) {
  const router = useRouter();
  const [image, setImage] = useState<File | null>();
  const [selectedCargos, setSelectedCargos] = useState<string[]>([]);
  const [isOpenCargo, setIsOpenCargo] = useState(false);
  const [message, setMessage] = useState<{
    type: 'error' | 'success';
    message: string;
  }>();

  const queryClient = useQueryClient();
  const isAdd = !colaborador;

  useEffect(() => {
    if (!isAdd) {
      if (colaborador?.cargos) setSelectedCargos(colaborador?.cargos);
      try {
        if (colaborador?.avatar) {
          // api
          //   .get(`/api/avatar/${colaborador.avatar}`)
          //   .then((response) => console.log(response.data))
          //   .catch((error) => console.error(error));
          // .then((res) => console.log(res.data));
          fetch(`/api/avatar/${colaborador.avatar}`, {
            method: 'GET',
            headers: {
              Accept: '*/*',
            },
          })
            .then((res) => {
              return res.blob();
            })
            .then((blobData) => {
              setImage(
                new File([blobData], String(colaborador.avatar), {
                  type: blobData.type,
                })
              );
            });
        }
      } catch (error) {}
    }
  }, [isAdd]);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Colaborador>({
    resolver: zodResolver(colaboradorSchema),
  });
  const { mutate, isLoading: isLoadingMutate } = useMutation({
    mutationFn: (data: FormData) => {
      if (isAdd) {
        return api.post('/api/controle/colaborador', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        return api.put('/api/controle/colaborador', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
    },
  });

  const handleFormatterCEP: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
    setValue('cep', value);
    onCEP(value.replace(/\D/g, ''));
  };
  const onCEP = (cep: string) => {
    if (cep.length < 8) return;
    fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
    })
      .then((res) =>
        res.json().then((data) => {
          const logradouro = data as ViaCEP;

          setValue('logradouro', logradouro.logradouro);
          setValue('bairro', logradouro.bairro);
          setValue('cidade', logradouro.localidade);
          setValue('uf', logradouro.uf);
        })
      )
      .catch(() => {});
  };
  const handleFormatterPHONE: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name } = event.target;
    let value = event.target.value.replace(/\D/g, '');
    if (value.length === 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else {
      value = value.replace(/(\d{2})(\d)(\d{4})(\d{4})$/, '($1)  $2 $3-$4');
    }
    if (name === 'telefone') setValue('telefone', value);
    else if (name === 'celular') setValue('celular', value);
    else setValue('telefone_comercial', value);
  };
  const handleSelected = (cargo: Occupation) => {
    const cargoAlreadExist = selectedCargos.find((item) => item === cargo.nome);

    let newCargos: string[] = [];
    if (cargoAlreadExist) {
      newCargos = selectedCargos.filter((item) => item !== cargo.nome);
    } else {
      newCargos = [...selectedCargos, cargo.nome];
    }
    const sortedNewOccupations = newCargos.sort();
    // console.log('new', sortedNewOccupations);

    setSelectedCargos(sortedNewOccupations);
  };

  const onSubmit = handleSubmit((data) => {
    try {
      const frm = new FormData();
      let newData = {};
      if (isAdd) {
        newData = {
          ...data,
          cargos: selectedCargos.join(','),
          image: image ? image.name : image,
        };
      } else {
        newData = {
          ...data,
          id: colaboradorId,
          cargos: selectedCargos.join(','),
          image: image ? image.name : image,
        };
      }
      const strData = JSON.stringify(newData);
      frm.append('data', strData);
      if (image) {
        frm.append(
          'avatar',
          new File([image], image.name, {
            type: image.type,
          })
        );
      }
      mutate(frm, {
        onSuccess: (success) => {
          setMessage({
            type: 'success',
            message: 'Gravado com sucesso!',
          });
          queryClient.invalidateQueries(['lista-colaborador']);
        },
        onError: (e) => {
          if (e instanceof Error)
            setMessage({ type: 'error', message: e.message });
          else if (e instanceof AxiosError)
            setMessage({ type: 'error', message: e.response?.data });
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finalizado');
    }
  });
  const handleCloseToast = () => {
    setMessage(undefined);
  };
  return (
    <Layout>
      <Toast
        open={message !== undefined}
        title={isAdd ? 'Cadastro' : 'Alteração'}
        handleClose={handleCloseToast}
      >
        <span
          className={clsx('font-bold text-lg p-2', {
            'text-red-700': message?.type === 'error',
            'text-green-700': message?.type === 'success',
          })}
        >
          {message?.message}
        </span>
      </Toast>
      <CargoDialog
        isOpen={isOpenCargo}
        setIsOpen={setIsOpenCargo}
        occupations={selectedCargos}
        onOccupationsChange={handleSelected}
      />
      <FormPadrao
        title={`${isAdd ? 'Incluir' : 'Editar'} Colaborador`}
        handleSubmit={onSubmit}
        footer={
          <footer className='bg-gray-50 px-2 py-1 text-right sm:px-6'>
            <Button
              variant='primary'
              type='submit'
            >
              Gravar
            </Button>
          </footer>
        }
      >
        <CroppedImage
          file={image}
          onImage={setImage}
        />
        <Scroll.Root className='relative h-[calc(100vh-22rem)] md:h-full overflow-hidden'>
          <Scroll.Viewport className='relative h-full w-full'>
            <div className='pr-4 pl-1 space-y-2 pb-2'>
              <div className='relative grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div>
                  <Label htmlFor='nome'>Nome</Label>
                  <TextInput.Root error={errors['nome']}>
                    <TextInput.Input
                      placeholder='Joe Doe'
                      {...register('nome', {
                        value: colaborador?.nome,
                      })}
                    />
                  </TextInput.Root>
                </div>
                <div>
                  <Label htmlFor='razao'>Razão Social</Label>
                  <TextInput.Root error={errors['razao']}>
                    <TextInput.Input
                      placeholder='Joe Doe'
                      {...register('razao', {
                        value: colaborador?.razao,
                      })}
                    />
                  </TextInput.Root>
                </div>
              </div>
              <div>
                <div>
                  <Label htmlFor='cargo'>Cargo</Label>
                  <div className='flex flex-row items-center justify-center gap-2  '>
                    <div
                      className={clsx(
                        'flex items-center py-2 px-3 rounded-md border border-gray-600',
                        'bg-gray-100 w-full focus-within:outline-none  focus-within:ring-1',
                        'focus-within:ring-blue-600 focus-within:border-transparent h-11'
                      )}
                    >
                      {selectedCargos?.map((nome) => (
                        <button
                          key={nome}
                          type='button'
                          onClick={() => handleSelected({ nome })}
                          className='relative text-md text-white bg-green-400 px-2 py-1 rounded-full mr-2'
                        >
                          <span className='absolute w-2 h-2 md:w-4 md:h-4 text-xs bg-red-500 rounded-full -right-2 -top-1 leading flex justify-center items-center'>
                            <X />
                          </span>
                          <span>{nome}</span>
                        </button>
                      ))}
                    </div>
                    <Button
                      variant='info'
                      type='button'
                      onClick={() => setIsOpenCargo(true)}
                    >
                      <Plus
                        weight='bold'
                        className='w-6 h-6'
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 md:flex gap-2'>
                <div className='w-full md:w-28'>
                  <Label htmlFor='razao'>CEP</Label>
                  <TextInput.Root error={errors['cep']}>
                    <TextInput.Input
                      placeholder='99.999-999'
                      {...register('cep', {
                        onChange: handleFormatterCEP,
                        value: colaborador?.cep,
                      })}
                    />
                  </TextInput.Root>
                </div>
                <div className='w-full'>
                  <Label htmlFor='logradouro'>Logradouro</Label>
                  <TextInput.Root>
                    <TextInput.Input
                      disabled
                      placeholder='Street Joe Doe'
                      {...register('logradouro', {
                        value: colaborador?.logradouro,
                      })}
                    />
                  </TextInput.Root>
                </div>
              </div>
              <div className='relative grid grid-cols-1 md:flex gap-2'>
                <div className='w-full md:w-28'>
                  <Label htmlFor='numero'>Nº.</Label>
                  <TextInput.Root error={errors['numero']}>
                    <TextInput.Input
                      placeholder='99999'
                      {...register('numero', { value: colaborador?.numero })}
                    />
                  </TextInput.Root>
                </div>
                <div className='w-full md:w-28'>
                  <Label htmlFor='complemento'>Complemento</Label>
                  <TextInput.Root>
                    <TextInput.Input
                      placeholder='Apto 3020'
                      {...register('complemento', {
                        value: colaborador?.complemento,
                      })}
                    />
                  </TextInput.Root>
                </div>
                <div className='w-full'>
                  <Label htmlFor='bairro'>Bairro</Label>
                  <TextInput.Root error={errors['bairro']}>
                    <TextInput.Input
                      disabled
                      placeholder='Jardim Atlântico'
                      {...register('bairro', { value: colaborador?.bairro })}
                    />
                  </TextInput.Root>
                </div>
              </div>
              <div className='grid grid-cols-1 md:flex gap-2'>
                <div className='w-full'>
                  <Label htmlFor='cidade'>Cidade</Label>
                  <TextInput.Root error={errors['cidade']}>
                    <TextInput.Input
                      disabled
                      placeholder='Olinda'
                      {...register('cidade', { value: colaborador?.cidade })}
                    />
                  </TextInput.Root>
                </div>
                <div className='w-28'>
                  <Label htmlFor='uf'>Estado</Label>
                  <TextInput.Root error={errors['uf']}>
                    <TextInput.Input
                      disabled
                      placeholder='Pernambuco'
                      {...register('uf', { value: colaborador?.uf })}
                    />
                  </TextInput.Root>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                <div className=''>
                  <Label htmlFor='telefone'>Telefone</Label>
                  <TextInput.Root error={errors['telefone']}>
                    <TextInput.Input
                      placeholder='(81) 9999-9999'
                      maxLength={12}
                      {...register('telefone', {
                        onChange: handleFormatterPHONE,
                        value: colaborador?.telefone,
                      })}
                    />
                  </TextInput.Root>
                </div>
                <div className=''>
                  <Label htmlFor='celular'>Celular</Label>
                  <TextInput.Root error={errors['celular']}>
                    <TextInput.Input
                      placeholder='(81) 9 9999-9999'
                      maxLength={16}
                      {...register('celular', {
                        onChange: handleFormatterPHONE,
                        value: colaborador?.celular,
                      })}
                    />
                  </TextInput.Root>
                </div>
                <div className=''>
                  <Label htmlFor='comercial'>Comercial</Label>
                  <TextInput.Root error={errors['telefone_comercial']}>
                    <TextInput.Input
                      placeholder='(81) 9 9999-9999'
                      maxLength={16}
                      {...register('telefone_comercial', {
                        onChange: handleFormatterPHONE,
                        value: colaborador?.telefone_comercial,
                      })}
                    />
                  </TextInput.Root>
                </div>
              </div>
            </div>
          </Scroll.Viewport>
          <Scroll.Scrollbar
            orientation='vertical'
            className='flex p-1 duration-300 ease-out bg-gray-300 bg-opacity-20 hover:p-2'
          >
            <Scroll.Thumb
              className={clsx('bg-blue-500 rounded-full min-w-[10px]')}
            />
          </Scroll.Scrollbar>
        </Scroll.Root>
      </FormPadrao>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  if (slug === 'novo') {
    return { props: {} };
  }
  const repository = new PrismaColaboradoresRepository();
  const result = await repository.findById(slug);
  if (!result) {
    return {
      props: {},
    };
  }
  const colaborador = ColaboradorViewModel.toHTTP(
    PrismaColaboradoresMapper.toDomain(result)
  );

  const parsed = colaboradorSchema.parse(colaborador);

  return {
    props: { colaborador: parsed, colaboradorId: colaborador.id },
  };
};
