import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gradients: {
      primary: string;
      error: string;
    };
    customShadows: {
      card: string;
      cardHover: string;
      error: string;
    };
  }
  interface PaletteOptions {
    gradients?: {
      primary?: string;
      error?: string;
    };
    customShadows?: {
      card?: string;
      cardHover?: string;
      error?: string;
    };
  }
  interface TypeBackground {
    subtle: string;
  }
}

const theme = createTheme({
  shape: {
    borderRadius: 4,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#00509e",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fdb813",
      contrastText: "#000",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#2e7d32",
    },
    warning: {
      main: "#ed6c02",
    },
    info: {
      main: "#1976d2",
    },
    background: {
      default: "#f6f8fa",
      paper: "#ffffff",
      subtle: "#f8f9fa",
    },
    gradients: {
      primary: "linear-gradient(135deg, #00509e 0%, #1976d2 100%)",
      error: "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
    },
    customShadows: {
      card: "0 8px 32px rgba(0, 80, 158, 0.08)",
      cardHover: "0 12px 40px rgba(0, 80, 158, 0.15)",
      error: "0 8px 32px rgba(211, 47, 47, 0.08)",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
        size: "small",
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: "all 0.3s ease-in-out",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
