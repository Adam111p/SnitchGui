import { StrictMode } from 'react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { customTheme } from './customTheme';
import { router } from './app/router';
import { NotificationProvider } from './app/context/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={customTheme}>
          <RouterProvider router={router} />
          <CssBaseline /> {/* Reset CSS dla MUI */}
        </ThemeProvider>
      </QueryClientProvider>
    </NotificationProvider>
  </StrictMode>,
);
