/// <reference types="vite/client" />

// Custom module declarations
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Theme declaration
declare module './theme' {
  import { Theme } from '@mui/material/styles';
  const theme: Theme;
  export default theme;
}
