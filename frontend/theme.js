// This file is for custom theme overrides if needed in the future
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00b894',
    },
    secondary: {
      main: '#0984e3',
    },
    background: {
      default: '#f1f2f6',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial',
  },
});

export default theme;
