import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { zodResolver } from '@hookform/resolvers/zod';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { useForm } from 'react-hook-form';
import { Label } from '../form/label';
import { TextInput } from '../form/text-input';
import { z } from 'zod';
import { Button } from '../form/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/infra/axios';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import * as Dialog from '@radix-ui/react-dialog';
import { PessoaIcon } from '../icons/pessoa-icon';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { ArrowsClockwise, TrashSimple, X } from 'phosphor-react';
import getCroppedImg, {
  GetCroppedImgResponse,
} from '@/application/shared/crop-image';
import { Toast } from '../toast';

const dataSchema = z.object({
  firstName: z.string({
    required_error: 'Campo é obrigatório',
  }),
  lastName: z.string({
    required_error: 'Campo é obrigatório',
  }),
  avatar: z
    .string()
    .nullish()
    .nullable()
    .transform((value) => value ?? null),
  email: z
    .string({
      required_error: 'Campo é obrigatório',
    })
    .email({
      message: 'Não é um e-mail válido',
    }),
});
type updateData = z.infer<typeof dataSchema>;
interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
}
export function EditUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<{
    type: 'error' | 'success';
    message: string;
  }>();

  const [image, setImage] = useState<File>();
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User>();

  const [imageCroped, setImageCroped] = useState<GetCroppedImgResponse | null>(
    null
  );

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };
  const showCroppedImage = async () => {
    try {
      if (image && croppedArea) {
        const croppedImage = await getCroppedImg(
          URL.createObjectURL(image),
          croppedArea,
          0
        );
        setImageCroped(croppedImage);
        return croppedImage;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
    }
  };
  const { type } = router.query;
  let id: string;
  id = String(type);

  useEffect(() => {
    api
      .get<updateData>(`/api/controle/usuario/encontrar/id/${id}`)
      .then(({ data }) => {
        if (data) {
          setUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            avatar: data.avatar,
          });
        }
      })
      .catch((error) => {
        if (error instanceof Error)
          setMessage({
            type: 'error',
            message: error.message,
          });
      });
  }, [id]);
  const { mutate, isLoading: loadingMutation } = useMutation({
    mutationFn: (data: FormData) => {
      return api.put('/api/controle/usuario', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
  });

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
      setIsOpen(true);
    }
  };

  const handleOnSubmit = handleSubmit((data) => {
    const form = new FormData();
    form.append('data', JSON.stringify(data));
    if (imageCroped && imageCroped.file && image) {
      form.append(
        'avatar',
        new File([imageCroped.file], image?.name, {
          type: image.type,
        })
      );
    }
    mutate(form, {
      onSuccess: () => {
        setMessage({
          type: 'success',
          message: 'Gravado com sucesso!',
        });
      },
      onError: (e) => {
        if (e instanceof Error)
          setMessage({
            type: 'error',
            message: e.message,
          });
      },
    });
  });
  const handleCloseToast = () => {
    setMessage(undefined);
  };

  return (
    <div className='container mx-auto px-2 sm:px-4 max-w-3xl '>
      <Toast
        open={message !== undefined}
        title={'Alteração'}
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
      <h1 className='font-medium py-2'>Atualizar Usuário</h1>
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        multiple={false}
        hidden
        onChange={onSelectFile}
      />

      <form
        onSubmit={handleOnSubmit}
        className='relative h-full flex flex-col justify-between bg-white shadow-lg rounded-lg overflow-hidden'
      >
        <DropdownMenuPrimitive.Root>
          <div className='mt-4 flex items-center justify-center  w-full cursor-pointer'>
            <DropdownMenuPrimitive.Trigger asChild>
              <div className='w-20 h-20 text-cyan-800 border bg-green-50 rounded-full'>
                {(imageCroped && imageCroped.file) || user?.avatar ? (
                  <Avatar.Root>
                    <Avatar.AvatarImage
                      src={
                        imageCroped?.file
                          ? URL.createObjectURL(imageCroped.file)
                          : `/api/avatar/${user?.avatar}`
                      }
                      className='rounded-full'
                    />
                  </Avatar.Root>
                ) : (
                  <PessoaIcon />
                )}
              </div>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align='end'
                sideOffset={5}
                className={clsx(
                  'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56',
                  'bg-green-50 dark:bg-gray-800'
                )}
              >
                <DropdownMenuPrimitive.Item
                  onClick={() => {
                    if (inputRef && inputRef.current) inputRef.current.click();
                  }}
                  className={clsx(
                    'flex cursor-default select-none items-center rounded-md px-2 py-2 text-base outline-none',
                    'text-gray-400 focus:bg-blue-50 dark:text-gray-500 dark:focus:bg-gray-900'
                  )}
                >
                  <ArrowsClockwise className='mr-2 h-3.5 w-3.5' />
                  <span>Trocar Avatar</span>
                </DropdownMenuPrimitive.Item>
                <DropdownMenuPrimitive.Item
                  onClick={() => setIsOpen(true)}
                  className={clsx(
                    'flex cursor-default select-none items-center rounded-md px-2 py-2 text-base outline-none',
                    'text-gray-400 focus:bg-blue-50 dark:text-gray-500 dark:focus:bg-gray-900'
                  )}
                >
                  <TrashSimple className='mr-2 h-3.5 w-3.5' />
                  <span>Remover Avatar</span>
                </DropdownMenuPrimitive.Item>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </div>
        </DropdownMenuPrimitive.Root>

        <div className='p-4 space-y-2'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div>
              <Label htmlFor='firstName'>Primeiro Nome</Label>
              <TextInput.Root error={errors['firstName']}>
                <TextInput.Input
                  {...register('firstName', {
                    value: user?.firstName,
                  })}
                  type='text'
                />
              </TextInput.Root>
            </div>
            <div>
              <Label htmlFor='lastName'>Sobrenome</Label>
              <TextInput.Root error={errors['lastName']}>
                <TextInput.Input
                  {...register('lastName', { value: user?.lastName })}
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
                {...register('email', { value: user?.email })}
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
      <Dialog.Root
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0 z-40' />
          <Dialog.Content className='absolute z-50 p-10 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Dialog.Close className='absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900'>
              <X
                size={24}
                aria-label='fechar'
              />
            </Dialog.Close>
            <Dialog.Title className='text-3xl leading-tight font-extrabold'>
              Avatar
            </Dialog.Title>
            <div className='flex flex-col gap-4'>
              <div className='flex bg-white mt-10 relative h-60 '>
                <Cropper
                  cropShape='round'
                  image={image ? URL.createObjectURL(image) : ''}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  showGrid={false}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                />
              </div>
              <div className='flex flex-col bg-green-100 '>
                <h1 className='block text-xl text-center text-gray-400'>{`Zoom ${zoom.toFixed(
                  2
                )}`}</h1>
                <input
                  type='range'
                  value={zoom}
                  placeholder='zoom'
                  min={1}
                  max={5}
                  step={0.1}
                  aria-labelledby='Zoom'
                  onChange={(e) => {
                    setZoom(+e.target.value);
                  }}
                  className='zoom-range'
                />
                <h1 className='block text-xl text-center text-gray-400'>{`Rotação ${rotation}º`}</h1>
                <input
                  type='range'
                  value={rotation}
                  placeholder='rotação'
                  min={1}
                  max={360}
                  step={1}
                  aria-labelledby='Rotação'
                  onChange={(e) => {
                    setRotation(+e.target.value);
                  }}
                  className='rotacao-range'
                />
              </div>
            </div>
            <footer className='flex w-full items-center justify-evenly mt-4 gap-2'>
              <Button variant='primary'>Trocar</Button>
              <Button variant='danger'>Cancelar</Button>
              <Button
                variant='success'
                onClick={() => showCroppedImage()}
              >
                Cortar
              </Button>
            </footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
