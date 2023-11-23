import React from 'react';
import {useToastService} from '../../services/toast-service';
import {SpotiToast} from './spotiToast';

const ToastContainer = () => {
  const {toasts} = useToastService();

  return (
    <div className="toast-container fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <SpotiToast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
