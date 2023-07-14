import { setupWorker } from 'msw';

import { handlers } from './Handlers';

export const worker = setupWorker(...handlers);
