import { Routes } from '@angular/router';

import { DemandeComponent} from './demande.component';

export const routes: Routes = [
  {
    path: '',
    component: DemandeComponent,
    data: {
      title: 'Demande'
    }
  }
];
