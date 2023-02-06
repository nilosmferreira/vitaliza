import getCroppedImg from '@/application/shared/crop-image';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Button } from '../form/button';
interface CroppedDialogProps {
  isOpen: boolean;
  changeIsOpen: (value: boolean) => void;
  image: File | undefined | null;
  onImage: (file: File) => void;
}
export function CroppedDialog({
  isOpen,
  changeIsOpen,
  image,
  onImage,
}: CroppedDialogProps) {
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(1);

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
        // setImageCroped(croppedImage);
        if (croppedImage && croppedImage.file) {
          onImage(
            new File([croppedImage.file], image.name, {
              type: image.type,
            })
          );
        }
        return croppedImage;
      }
    } catch (error) {
      console.error(error);
    } finally {
      changeIsOpen(false);
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={changeIsOpen}
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
  );
}
