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

export default function ColaboradorCadEdit() {
  const router = useRouter();
  const [image, setImage] = useState<File>();
  const { slug } = router.query;

  return (
    <Layout>
      <FormPadrao
        title='Incluir colaborador'
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
        <Scroll.Root className='relative w-[calc(100%-1rem)] h-96 overflow-hidden'>
          <Scroll.Viewport className='relative border h-full'>
            <div className='pr-4 pl-1 '>
              <div>
                <Label htmlFor='nome'>Nome</Label>
                <TextInput.Root>
                  <TextInput.Input placeholder='Joe Doe' />
                </TextInput.Root>
              </div>
              <div>
                <Label htmlFor='razao'>Razão Social</Label>
                <TextInput.Root>
                  <TextInput.Input placeholder='Joe Doe' />
                </TextInput.Root>
              </div>

              <div className='w-28'>
                <Label htmlFor='razao'>CEP</Label>
                <TextInput.Root>
                  <TextInput.Input placeholder='99.999-999' />
                </TextInput.Root>
              </div>
              <div>
                <Label htmlFor='razao'>Logradouro</Label>
                <TextInput.Root>
                  <TextInput.Input
                    disabled
                    placeholder='Street Joe Doe'
                  />
                </TextInput.Root>
              </div>
              <div className='grid grid-cols-1 md:flex md:gap-2'>
                <div className='w-full md:w-28 '>
                  <Label htmlFor='razao'>Nº.</Label>
                  <TextInput.Root>
                    <TextInput.Input placeholder='99999' />
                  </TextInput.Root>
                </div>
                <div className='w-full'>
                  <Label htmlFor='complemento'>complemento</Label>
                  <TextInput.Root>
                    <TextInput.Input placeholder='Apto 3020' />
                  </TextInput.Root>
                </div>
              </div>
              <div className=''>
                <Label htmlFor='bairro'>Bairro</Label>
                <TextInput.Root>
                  <TextInput.Input placeholder='Jardim Atlântico' />
                </TextInput.Root>
              </div>

              <div className='grid grid-cols-1 md:flex md:gap-2'>
                <div className='w-full'>
                  <Label htmlFor='cidade'>Cidade</Label>
                  <TextInput.Root>
                    <TextInput.Input placeholder='Olinda' />
                  </TextInput.Root>
                </div>

                <div className='w-full md:w-12'>
                  <Label htmlFor='razao'>UF</Label>
                  <TextInput.Root>
                    <TextInput.Input placeholder='PE' />
                  </TextInput.Root>
                </div>
              </div>

              <div className='flex flex-wrap justify-between'>
                <div className='w-full md:w-32'>
                  <Label htmlFor='telefone'>Telefone</Label>
                  <TextInput.Root>
                    <TextInput.Input placeholder='(81) 9999-9999' />
                  </TextInput.Root>
                </div>
                <div className='w-full md:w-36'>
                  <Label htmlFor='celular'>Celular</Label>
                  <TextInput.Root>
                    <TextInput.Input placeholder='(81) 9 9999-9999' />
                  </TextInput.Root>
                </div>
                <div className='w-full md:w-36'>
                  <Label htmlFor='comercial'>Comercial</Label>
                  <TextInput.Root>
                    <TextInput.Input placeholder='(81) 9 9999-9999' />
                  </TextInput.Root>
                </div>
              </div>
            </div>
          </Scroll.Viewport>
          <Scroll.Scrollbar
            style={{ userSelect: 'none', touchAction: 'none' }}
            orientation='vertical'
            className='flex p-1 duration-300 ease-out bg-gray-300 bg-opacity-20 hover:p-2'
          >
            <Scroll.Thumb
              className={clsx('bg-blue-500 rounded-full min-w-[10px]')}
            />
          </Scroll.Scrollbar>
          {/* <Scroll.Scrollbar
            orientation='horizontal'
            className='overflow-hidden'
          >
            <Scroll.Thumb
              className={clsx('bg-blue-500 rounded-full min-w-[10px]')}
            />
          </Scroll.Scrollbar>
          <Scroll.Corner className='ScrollAreaCorner' /> */}
        </Scroll.Root>
      </FormPadrao>
    </Layout>
  );
}
