import {ToastContext} from 'flowbite-react/lib/esm/components/Toast/ToastContext';
import React, {useContext, useState} from 'react';

export const useToastService = () => {
  return useContext(ToastContext);
};

export const ToastServiceProvider = ({children}) => {
  const [toasts, setToasts] = useState([]);

  const addToast = toast => {
    toast.id = Date.now();
    setToasts(prevToasts => [...prevToasts, toast]);
  };

  const removeToast = id => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{toasts, addToast, removeToast}}>
      {children}
    </ToastContext.Provider>
  );
};
