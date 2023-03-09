import '@/styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import type { AppProps } from 'next/app'
import { wrapper } from '../../store/store';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#000', contrastText: '#fff' },
      secondary: { main: '#fff', contrastText: '#12D3A5' },
      error: { main: '#F3494C' },
      warning: { main: '#FFCB65' },
      success: { main: '#12D3A5' },
      info: { main: '#EFF6FF', contrastText: '#2196F3' },
      text: {
        primary: '#fff',
        secondary: '#333',
        disabled: '#EFF6FF',
      }
    },
    typography: {
      fontFamily: 'Roboto',
      fontWeightMedium: 400,
      body1: {
        color: "#fff",
      },
      body2: {
        color: "#fff",
      },
      h1: {
        color: "#fff",
      },
      h5: {
        color: "#fff",
      },
      button: {
        color: "#fff",
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none"
          }
        }
      },
    },
  },
);

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default wrapper.withRedux(App);
