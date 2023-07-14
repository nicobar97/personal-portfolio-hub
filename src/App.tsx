import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './components/globals/GlobalStyle';
import { theme } from './style/style';
import { GlobalFonts } from './components/globals/GlobalFonts';
import { useThemeStore } from './stores/useThemeStore';

type Props = {
  router: ComponentProps<typeof RouterProvider>['router'];
};

const queryClient = new QueryClient();

export const App: React.FC<Props> = (props: Props) => {
  const themeStore = useThemeStore();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle themeStyle={themeStore.style} />
        <GlobalFonts />
        <RouterProvider router={props.router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
