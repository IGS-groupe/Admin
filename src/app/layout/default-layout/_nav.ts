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
    name: 'Demande list',
    url: '/Listdemandes',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Parametres',
    url: '/ListParamater',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Messages',
    url: '/messages',
    iconComponent: { name: 'cil-envelope-open' }
  },

];
