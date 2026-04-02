import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LogSearch from './pages/LogSearch';
import { App } from './app';
import HistoryLog from './pages/history';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'logs', element: <LogSearch /> },
      { path: '', element: <Navigate to="/logs" replace /> },
      { path: 'history',element: <HistoryLog /> },
    ],
  },
]);
