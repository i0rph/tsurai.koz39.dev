/* @refresh reload */
import 'styles/global.css';
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { Toaster } from 'solid-toast';
import { createMediaQuery } from '@solid-primitives/media';
import { AppProvider } from 'hooks/useContext';
import App from './app';

const isSmall = createMediaQuery('(min-width: 640px)');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error('Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?');
}

render(
  () => (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
          <Toaster position={isSmall() ? 'top-center' : 'bottom-center'} toastOptions={{ duration: 3000 }} />
        </AppProvider>
      </QueryClientProvider>
    </Router>
  ),
  root,
);
