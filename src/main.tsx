import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { config } from './configuration/ViteConfiguration';
import { router } from './router';

(async () => {
  if (config.environment === 'mock') {
    const { worker } = await import('./mocks/browser');
    worker.start();
  }

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App router={router} />
    </React.StrictMode>,
  );
})();
