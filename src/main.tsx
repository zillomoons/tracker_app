import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page';
import Settings from './routes/settings';
import Index from './routes';
import { AddHabitForm } from './components/addHabit';
import { EditHabitForm } from './components/editHabit';
import { Provider } from 'react-redux';
import store from './app/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: '/add-habit', element: <AddHabitForm /> },
      { path: '/habits/:id', element: <EditHabitForm /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);