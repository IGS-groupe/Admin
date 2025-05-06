import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./news-list/news-list.component').then(m => m.NewsListComponent),
    data: { title: 'News List' }
  },
  {
    path: 'create',
    loadComponent: () => import('./news-create/news-create.component').then(m => m.NewsCreateComponent),
    data: { title: 'Create News' }
  },
  {
    path: 'edit/:slug',
    loadComponent: () => import('./news-edit/news-edit.component').then(m => m.NewsEditComponent),
    data: { title: 'Edit News' }
  }
];
