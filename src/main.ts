import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component';

const routes: Route[] = [
  {
    path: 'counter',
    loadComponent: () =>
      import('./app/components/counter/counter.component').then(
        (m) => m.CounterComponent
      ),
  },
  {
    path: 'counter2',
    loadComponent: () =>
      import('./app/components/counter/counter.component').then(
        (m) => m.CounterComponent
      ),
  },
  {
    path: 'person',
    loadComponent: () =>
      import('./app/components/person/person.component').then(
        (m) => m.PersonComponent
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

bootstrapApplication(AppComponent, {
  providers: [provideClientHydration(), provideRouter(routes)],
});
