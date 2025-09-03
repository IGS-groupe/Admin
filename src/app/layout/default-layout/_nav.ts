import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'User'
  },
  {
    name: 'Clients',
    url: '/client-table',
    iconComponent: { name: 'cil-people' }
  },
  
  {
    name: 'Admin',
    url: '/Employess',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cil-user' }
  },
  {
    title: true,
    name: 'Invoicing'
  },
  {
    name: 'dashboard',
    url: '/charts',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Demande list',
    url: '/Listdemandes',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Project Cards',
    url: '/project-cards',
    iconComponent: { name: 'cil-layers' }
  },
  {
    name: 'News',
    url: '/news', // Add leading slash for absolute path
    iconComponent: { name: 'cil-notes' },
    // linkProps: { routerLink: true } // Explicitly tell CoreUI to use routerLink
  },
  // {
  //   name: 'Parametres',
  //   url: '/ListParamater',
  //   iconComponent: { name: 'cil-notes' }
  // },
  {
    name: 'Messages',
    url: '/messages',
    iconComponent: { name: 'cil-envelope-open' }
  },

];
