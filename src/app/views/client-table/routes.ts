import { Routes } from '@angular/router';

import {ClientTableComponent } from './client-table.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientTableComponent,
    data: {
      title: 'Client'
    }
  }
];
