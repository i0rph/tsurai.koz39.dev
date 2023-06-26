import type { Component } from 'solid-js';
import { Link, useRoutes, useLocation } from '@solidjs/router';

import { routes } from './routes';

const App: Component = () => {
  const location = useLocation();
  const Route = useRoutes(routes);

  return (
    <>
      <nav class="bg-gray-200 px-4 text-gray-900">
        <ul class="flex items-center">
          <li class="px-4 py-2">
            <Link href="/" class="no-underline hover:underline">
              Home
            </Link>
          </li>
          <li class="px-4 py-2">
            <Link href="/about" class="no-underline hover:underline">
              About
            </Link>
          </li>
          <li class="px-4 py-2">
            <Link href="/error" class="no-underline hover:underline">
              Error
            </Link>
          </li>

          <li class="ml-auto flex items-center space-x-1 text-sm">
            <span>URL:</span>
            <input class="w-75px rounded-lg bg-white p-1 text-sm" type="text" readOnly value={location.pathname} />
          </li>
        </ul>
      </nav>

      <main>
        <Route />
      </main>
    </>
  );
};

export default App;
