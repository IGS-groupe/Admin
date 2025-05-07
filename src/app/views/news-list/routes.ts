import { Routes } from '@angular/router';

import {NewsListComponent} from './news-list.component';


export const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
    data: {
      title: 'News List'
    }
  }
];
