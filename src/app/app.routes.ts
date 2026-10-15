import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/catalogo/catalogo')
        .then(m => m.Catalogo)
  },
  {
    path: 'agregar',
    loadComponent: () =>
      import('./components/form/form')
        .then(m => m.Form)
  },
  {
    path: 'detalle/:id',
    loadComponent: () =>
      import('./components/details/details')
        .then(m => m.Details)
  },
  {
    path: '**',
    redirectTo: ''
  }
];