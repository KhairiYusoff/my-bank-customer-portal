import { useTheme } from "@mui/material";
import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { SnackbarUtilsConfigurator } from "@/utils/snackbarUtils";

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const theme = useTheme();

  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      style={{
        '--SnackbarItem-variantSuccessBackground': theme.palette.success.main,
        '--SnackbarItem-variantErrorBackground': theme.palette.error.main,
      } as React.CSSProperties}
    >
      <SnackbarUtilsConfigurator />
      {children}
    </NotistackSnackbarProvider>
  );
};

export default SnackbarProvider;
