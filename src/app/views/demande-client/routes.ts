import { Routes } from '@angular/router';

import {DemandeClientComponent} from './demande-client.component';

export const routes: Routes = [
  {
    path: '',
    component: DemandeClientComponent,
    data: {
      title: 'Demande'
    }
  }
];
