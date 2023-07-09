import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from 'pages/home';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/notice',
    component: lazy(() => import('pages/notice')),
  },
  {
    path: '/faq',
    component: lazy(() => import('pages/faq')),
  },
  {
    path: '**',
    component: lazy(() => import('errors/404')),
  },
];
