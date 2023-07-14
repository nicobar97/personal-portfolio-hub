import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { createMemoryRouter } from 'react-router-dom';
import { routes } from '../../src/router';
import { server } from '../../src/mocks/Server';
import { rest } from 'msw';
import { Hello } from '../../src/model/Hello';
import { App } from '../../src/app';

export const handlers = [
  rest.get('/hello/:helloId', (req, res, ctx) =>
    res(ctx.delay(500), ctx.json<Hello>({ hello: req.params['helloId'] as string })),
  ),
];

afterEach(() => {
  cleanup();
});

describe('App', () => {
  it('should render', async () => {
    server.use(...handlers);
    render(
      <App
        router={createMemoryRouter(routes, {
          initialEntries: ['/testrender'],
        })}
      />,
    );
  });

  it('should remove Loading screen', async () => {
    server.use(...handlers);
    render(
      <App
        router={createMemoryRouter(routes, {
          initialEntries: ['/hello/HELLO'],
        })}
      />,
    );

    const loadingElement = await screen.getByTestId('loader');
    await waitForElementToBeRemoved(loadingElement);
  });

  it('should show helloId after loading', async () => {
    server.use(...handlers);
    render(
      <App
        router={createMemoryRouter(routes, {
          initialEntries: ['/hello/HELLO'],
        })}
      />,
    );

    const helloDiv = screen.getByText('HELLO');
    expect(helloDiv).toBeInTheDocument();
    expect(helloDiv).toBeVisible();
  });
});
