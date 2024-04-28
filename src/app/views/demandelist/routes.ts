import { Routes } from '@angular/router';

import { DemandelistComponent} from './demandelist.component';

export const routes: Routes = [
  {
    path: '',
    component: DemandelistComponent,
    data: {
      title: 'Demande list'
    }
  }
];
