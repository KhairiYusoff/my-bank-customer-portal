import { useSnackbar } from "notistack";
import { useCallback, useMemo } from "react";

export let useSnackbarRef: any;

// This component makes the enqueueSnackbar function available throughout the app
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

// Utility functions for showing different types of toasts
export const toast = {
  success(msg: string) {
    this.toast(msg, "success");
  },
  warning(msg: string) {
    this.toast(msg, "warning");
  },
  info(msg: string) {
    this.toast(msg, "info");
  },
  error(msg: string) {
    this.toast(msg, "error");
  },
  toast(
    msg: string,
    variant: "success" | "warning" | "info" | "error" = "info"
  ) {
    useSnackbarRef?.enqueueSnackbar(msg, { variant });
  },
};

// Custom hook for using snackbar
export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Memoize the functions to avoid unnecessary re-renders
  const success = useCallback((message: string) => enqueueSnackbar(message, { variant: "success" }), [enqueueSnackbar]);
  const error = useCallback((message: string) => enqueueSnackbar(message, { variant: "error" }), [enqueueSnackbar]);
  const warning = useCallback((message: string) => enqueueSnackbar(message, { variant: "warning" }), [enqueueSnackbar]);
  const info = useCallback((message: string) => enqueueSnackbar(message, { variant: "info" }), [enqueueSnackbar]);

  return useMemo(() => ({ success, error, warning, info }), [success, error, warning, info]);
};
