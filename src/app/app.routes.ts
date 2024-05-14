import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
     
      {
        path: 'demandelist',
        loadChildren: () => import('./views/demandelist/routes').then((m) => m.routes)
        },
        {
          path: 'echantillonList',
          loadComponent: () => import('./views/list-echantillon/list-echantillon.component').then(m => m.ListEchantillonComponent),
        },
      {
        path: 'Employess',
        loadComponent: () => import('./views/list-employee/list-employee.component').then(m => m.ListEmployeeComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./views/update-profile/update-profile.component').then(m => m.UpdateProfileComponent),
      },
      {
        path: 'client-table',
        loadChildren: () => import('./views/client-table/routes').then((m) => m.routes)
      },

      {
        path: 'Listdemandes',
        loadChildren: () => import('./views/demandelist/routes').then((m) => m.routes)
      },
      {
        path: 'ListParamater',
        loadComponent: () => import('./views/list-paramater/list-paramater.component').then((m) => m.ListParamaterComponent)
      },
      {
        path: 'add_employee',
        loadChildren: () => import('./views/add-employe/routes').then((m) => m.routes)
      },
      {
        path: 'add_parametre',
        loadChildren: () => import('./views/add-parametre/routes').then((m) => m.routes)
      },
      {
        path: 'messages',
        loadComponent: () => import('./views/messages/messages.component').then((m) => m.MessagesComponent)
      },
      // {
      //   path: 'theme',
      //   loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'base',
      //   loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'buttons',
      //   loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'forms',
      //   loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'icons',
      //   loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'charts',
      //   loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'pages',
      //   loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      // }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
