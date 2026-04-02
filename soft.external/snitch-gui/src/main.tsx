import { StrictMode } from 'react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { customTheme } from './customTheme';
import { router } from './app/router';
import { NotificationProvider } from './app/context/NotificationContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <NotificationProvider>
      <ThemeProvider theme={customTheme}>
        <RouterProvider router={router} />
        <CssBaseline /> {/* Reset CSS dla MUI */}
      </ThemeProvider>
    </NotificationProvider>
  </StrictMode>,
);
