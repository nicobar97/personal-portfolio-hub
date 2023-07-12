import { createBrowserRouter } from 'react-router-dom';

import { HelloPage } from './views/HelloPage';
import { LocalHelloPage } from './views/LocalHelloPage';
import { NotFound } from './views/NotFound';
import { MainPage } from './views/Page';

export const routes = [
  {
    path: 'page/:helloId',
    element: <MainPage />,
  },
  {
    path: 'hello/:helloId',
    element: <HelloPage />,
  },
  {
    path: 'local/hello/:helloId',
    element: <LocalHelloPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
