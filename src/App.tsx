import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './components/GlobalStyle';
import { theme } from './style/style';

type Props = {
  router: ComponentProps<typeof RouterProvider>['router'];
};

const queryClient = new QueryClient();

export const App: React.FC<Props> = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={props.router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
