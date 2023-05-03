import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'counter',
    loadComponent: () =>
      import('./components/counter/counter.component').then(
        (m) => m.CounterComponent
      ),
  },
  {
    path: 'person',
    loadComponent: () =>
      import('./components/person/person.component').then(
        (m) => m.PersonComponent
      ),
  },
  {
    path: 'testing',
    loadChildren: () =>
      import('./components/a-b-c-testing/a-b-c-testing.routes').then(
        (m) => m.abcTestingRoutes
      ),
  },
  {
    path: '',
    redirectTo: 'counter',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'counter',
  },
];
