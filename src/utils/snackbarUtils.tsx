import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export let useSnackbarRef: any;

// This component makes the enqueueSnackbar function available throughout the app
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

// Utility functions for showing different types of toasts
export const toast = {
  success(msg: string) {
    this.toast(msg, 'success');
  },
  warning(msg: string) {
    this.toast(msg, 'warning');
  },
  info(msg: string) {
    this.toast(msg, 'info');
  },
  error(msg: string) {
    this.toast(msg, 'error');
  },
  toast(msg: string, variant: 'success' | 'warning' | 'info' | 'error' = 'info') {
    useSnackbarRef?.enqueueSnackbar(msg, { variant });
  },
};

// Custom hook for using snackbar
export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();
  
  return {
    success: (message: string) => enqueueSnackbar(message, { variant: 'success' }),
    error: (message: string) => enqueueSnackbar(message, { variant: 'error' }),
    warning: (message: string) => enqueueSnackbar(message, { variant: 'warning' }),
    info: (message: string) => enqueueSnackbar(message, { variant: 'info' }),
  };
};
