import { Routes } from '@angular/router';

export const abcTestingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./a/a.component').then((m) => m.AComponent),
    canMatch: [() => d100() < 20],
  },
  {
    path: '',
    loadComponent: () => import('./b/b.component').then((m) => m.BComponent),
    canMatch: [() => d100() < 50],
  },
  {
    path: '',
    loadComponent: () => import('./c/c.component').then((m) => m.CComponent),
    canMatch: [() => d100() < 25],
  },
  {
    path: '',
    loadComponent: () => import('./d/d.component').then((m) => m.DComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

const d100 = (): number => Math.floor(Math.random() * 99) + 1;
