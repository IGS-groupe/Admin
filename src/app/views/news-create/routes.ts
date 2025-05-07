import { Routes } from '@angular/router';

import {NewsCreateComponent} from './news-create.component';


export const routes: Routes = [
  {
    path: '',
    component: NewsCreateComponent,
    data: {
      title: 'News Create'
    }
  }
];
