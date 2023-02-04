import { FormPadrao } from '@/components/form-padrao';
import { Button } from '@/components/form/button';
import { Label } from '@/components/form/label';
import { TextInput } from '@/components/form/text-input';
import { Layout } from '@/components/layout';
import { useRouter } from 'next/router';
import * as Scroll from '@radix-ui/react-scroll-area';
import clsx from 'clsx';
import { ChangeEventHandler, useState } from 'react';
import { CroppedImage } from '@/components/cropped-image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'phosphor-react';
import { CargoDialog } from '@/components/dialog/cargo-dialog';

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
  telefone: z.string(),
  celular: z.string(),
  telefone_comercial: z.string(),
  logradouro: z.string(),
  cidade: z.string(),
  uf: z.string(),
  bairro: z.string(),
});

type Colaborador = z.infer<typeof colaboradorSchema>;

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
export default function ColaboradorCadEdit() {
  const router = useRouter();
  const [image, setImage] = useState<File>();
  const [isOpenCargo, setIsOpenCargo] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Colaborador>({
    resolver: zodResolver(colaboradorSchema),
  });
  const { slug } = router.query;
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
    console.log(event.target.name);
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
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <Layout>
      <CargoDialog
        isOpen={isOpenCargo}
        setIsOpen={setIsOpenCargo}
      />
      <FormPadrao
        title='Incluir colaborador'
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
      >
        <CroppedImage
          file={image}
          onImage={setImage}
        />
        <Scroll.Root className='relative h-[calc(100vh-22rem)] md:h-96 overflow-hidden'>
          <Scroll.Viewport className='relative h-full w-full'>
            <div className='pr-4 pl-1 space-y-2 pb-2'>
              <div className='relative grid grid-cols-1 md:grid-cols-2 gap-2'>
                <div>
                  <Label htmlFor='nome'>Nome</Label>
                  <TextInput.Root error={errors['nome']}>
                    <TextInput.Input
                      placeholder='Joe Doe'
                      {...register('nome')}
                    />
                  </TextInput.Root>
                </div>
                <div>
                  <Label htmlFor='razao'>Razão Social</Label>
                  <TextInput.Root error={errors['razao']}>
                    <TextInput.Input
                      placeholder='Joe Doe'
                      {...register('razao')}
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
                      <span className='relative text-md text-white bg-green-400 px-2 py-1 rounded-full'>
                        <button
                          type='button'
                          className='absolute w-4 h-4 text-xs bg-red-500 rounded-full -right-2 -top-1 leading flex justify-center items-center'
                        >
                          <X />
                        </button>
                        <span>Diretor Financeiro</span>
                      </span>
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
                  {/* <TextInput.Root>
                    <TextInput.Icon>
                    </TextInput.Icon>
                  </TextInput.Root> */}
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='w-28'>
                  <Label htmlFor='razao'>CEP</Label>
                  <TextInput.Root error={errors['cep']}>
                    <TextInput.Input
                      placeholder='99.999-999'
                      {...register('cep', {
                        onChange: handleFormatterCEP,
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
                      {...register('logradouro')}
                    />
                  </TextInput.Root>
                </div>
              </div>
              <div className='relative flex gap-2'>
                <div className='w-full md:w-28'>
                  <Label htmlFor='numero'>Nº.</Label>
                  <TextInput.Root error={errors['numero']}>
                    <TextInput.Input
                      placeholder='99999'
                      {...register('numero')}
                    />
                  </TextInput.Root>
                </div>
                <div className='w-28'>
                  <Label htmlFor='complemento'>Complemento</Label>
                  <TextInput.Root>
                    <TextInput.Input
                      placeholder='Apto 3020'
                      {...register('complemento')}
                    />
                  </TextInput.Root>
                </div>
                <div className='w-full'>
                  <Label htmlFor='bairro'>Bairro</Label>
                  <TextInput.Root error={errors['bairro']}>
                    <TextInput.Input
                      disabled
                      placeholder='Jardim Atlântico'
                      {...register('bairro')}
                    />
                  </TextInput.Root>
                </div>
              </div>

              <div className='w-full'>
                <Label htmlFor='cidade'>Cidade</Label>
                <TextInput.Root error={errors['cidade']}>
                  <TextInput.Input
                    disabled
                    placeholder='Olinda'
                    {...register('cidade')}
                  />
                </TextInput.Root>
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
