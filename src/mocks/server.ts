import { setupServer } from 'msw/node';

export const server = setupServer();

server.listen({
  onUnhandledRequest: 'error',
});
