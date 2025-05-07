import { Routes } from '@angular/router';

import {News1Component} from './news1.component';

export const routes: Routes = [
  {
    path: '',
    component: News1Component,
    data: {
      title: 'News1'
    }
  }
];
