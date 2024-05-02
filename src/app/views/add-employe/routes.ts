import { Routes } from '@angular/router';

import {AddEmployeComponent } from './add-employe.component';

export const routes: Routes = [
  {
    path: '',
    component: AddEmployeComponent,
    data: {
      title: 'Add_Employee'
    }
  }
];
