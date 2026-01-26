import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home-section').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/home/home-section').then(m => m.HomeComponent) // Temporário
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/home/home-section').then(m => m.HomeComponent) // Temporário
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/home/home-section').then(m => m.HomeComponent) // Temporário
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
