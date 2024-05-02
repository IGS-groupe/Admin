import { Routes } from '@angular/router';

import {AddParametreComponent } from './add-parametre.component';

export const routes: Routes = [
  {
    path: '',
    component: AddParametreComponent,
    data: {
      title: 'Add_Parametre'
    }
  }
];
