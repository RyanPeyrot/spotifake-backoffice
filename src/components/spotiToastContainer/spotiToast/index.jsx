import React, {useEffect} from 'react';
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/solid';
import {Toast} from 'flowbite-react';
import {ToastToggle} from 'flowbite-react/lib/esm/components/Toast/ToastToggle';
import {useToastService} from '../../../services/toast-service';

export const SpotiToast = ({
  duration = 2000,
  id,
  type = 'success',
  message = 'Succès',
}) => {
  const {removeToast} = useToastService();

  useEffect(() => {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  return (
    <Toast className="py-2 px-3 toast">
      <>
        {type === 'success' ? (
          <CheckIcon className="text-white rounded-full p-1 bg-green-500 h-7 w-7" />
        ) : type === 'error' ? (
          <XMarkIcon className="text-white rounded-full p-1 bg-red-500 h-7 w-7" />
        ) : null}
      </>

      <div>
        <div className="ml-3 text-md font-bold">
          {type === 'success' ? 'Succès' : type === 'error' ? 'Erreur' : ''}
        </div>
        <div className="ml-3 text-xs font-normal">{message}</div>
      </div>

      <ToastToggle />
    </Toast>
  );
};
