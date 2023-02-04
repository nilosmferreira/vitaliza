import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import clsx from 'clsx';
import { ArrowsClockwise, TrashSimple } from 'phosphor-react';
import { ChangeEventHandler, useRef, useState } from 'react';
import { Area } from 'react-easy-crop';
import { PessoaIcon } from '../icons/pessoa-icon';
import { CroppedDialog } from './cropped-dialog';

interface CroppedImageProps {
  file?: File | undefined;
  avatar?: string;
  onImage: (file: File) => void;
}

export function CroppedImage({ file, avatar, onImage }: CroppedImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  // const [crop, setCrop] = useState({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState(1);
  // const [rotation, setRotation] = useState(1);

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (onImage) onImage(file);
      setIsOpen(true);
    }
  };

  return (
    <DropdownMenuPrimitive.Root>
      <CroppedDialog
        changeIsOpen={setIsOpen}
        isOpen={isOpen}
        image={file}
        onImage={onImage}
      />
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        multiple={false}
        hidden
        onChange={onSelectFile}
      />

      <div className='mt-4 flex items-center justify-center  w-full cursor-pointer'>
        <DropdownMenuPrimitive.Trigger asChild>
          <div className='w-20 h-20 text-cyan-800 border bg-green-50 rounded-full'>
            {file || avatar ? (
              <Avatar.Root>
                <Avatar.AvatarImage
                  src={
                    file ? URL.createObjectURL(file) : `/api/avatar/${avatar}`
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
  );
}
