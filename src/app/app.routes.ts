import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () =>
      import('@reactive/reactive.routes').then((m) => m.ReactiveRoutes),
  },
  {
    path: 'register',
    loadChildren: () => import('@auth/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: '**',
    redirectTo: '/reactive/basic',
  },
];
