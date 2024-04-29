import { Routes } from '@angular/router';

import { UserTableComponent} from './user-table.component';

export const routes: Routes = [
  {
    path: '',
    component: UserTableComponent,
    data: {
      title: 'table'
    }
  }
];
