import { Routes } from '@angular/router';

import { InvoiceComponent} from './invoice.component';

export const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    data: {
      title: 'Invoice'
    }
  }
];
