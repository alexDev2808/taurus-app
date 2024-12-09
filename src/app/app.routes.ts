import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'notfound',
        loadComponent: () => import('./notfound/notfound.component').then(m => m.NotfoundComponent)
    },
    {
        path: '**',
        redirectTo: 'notfound'
    }
];
