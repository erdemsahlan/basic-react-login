import React, { createContext, useContext, useRef, ReactNode, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { setGlobalToastRef } from '../utils/toastUtils';
import './ToastContext.css';

interface ToastContextType {
  showToast: (severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toast = useRef<Toast>(null);

  useEffect(() => {
    setGlobalToastRef(toast);
  }, []);

  const showToast = (severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) => {
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 4000,
      className: `custom-toast custom-toast-${severity}`
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toast} className="custom-toast-container" />
      {children}
    </ToastContext.Provider>
  );
}; 