import { useTheme } from "@mui/material";
import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { SnackbarUtilsConfigurator } from "@/utils/snackbarUtils";
import { useAppSelector } from "@/app/hooks";

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const theme = useTheme();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      style={{
        marginTop: isAuthenticated ? '20px' : '60px',
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
