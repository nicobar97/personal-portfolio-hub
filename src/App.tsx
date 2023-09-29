import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './components/globals/GlobalStyle';
import { theme } from './style/style';
import { GlobalFonts } from './components/globals/GlobalFonts';
import { useThemeStore } from './stores/useThemeStore';
import { TabManager } from './views/TabManager';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  const themeStore = useThemeStore();

  return (
    <ThemeProvider theme={theme[themeStore.style]}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <GlobalFonts />
        <BrowserRouter>
          <TabManager />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
