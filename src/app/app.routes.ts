import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'heroes',
        loadComponent: () =>
          import('./pages/hero-list/hero-list.component').then(
            (c) => c.HeroListComponent
          ),
      },
      {
        path: 'hero-page/:id',
        loadComponent: () =>
          import('./pages/hero-page/hero-page.component').then(
            (c) => c.HeroPageComponent
          ),
      },
      {
        path: 'favourites',
        loadComponent: () =>
          import('./pages/hero-favourites/hero-favourites.component').then(
            (c) => c.HeroFavouritesComponent
          ),
      },
      {
        path: '**', redirectTo:'heroes'
      }
    ],
  },
];
