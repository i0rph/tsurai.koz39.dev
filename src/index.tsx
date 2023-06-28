/* @refresh reload */
import 'styles/global.css';
import 'solid-devtools';
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { Toaster } from 'solid-toast';
import { StreamerProvider } from 'hooks/useContext';
import App from './app';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <Router>
      <QueryClientProvider client={queryClient}>
        <StreamerProvider>
          <App />
          <Toaster
            position={screen.availWidth > 640 ? 'top-center' : 'bottom-center'}
            toastOptions={{ duration: 3000 }}
          />
        </StreamerProvider>
      </QueryClientProvider>
    </Router>
  ),
  root,
);
