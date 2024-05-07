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
    name: 'Employee',
    url: '/Employess',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-user' }
  },
  {
    title: true,
    name: 'Invoicing'
  },
  {
    name: 'Demande list',
    url: '/Listdemandes', // This should match the route you defined in your Angular router
    iconComponent: { name: 'cil-notes' } // Change 'cil-wallet' to whatever icon you prefer
  },
  {
    name: 'Parametres',
    url: '/ListParamater', // This should match the route you defined in your Angular router
    iconComponent: { name: 'cil-notes' } // Change 'cil-wallet' to whatever icon you prefer
  },
  {
    name: 'Lougout',
    url: 'login', // This should match the route you defined in your Angular router
    iconComponent: { name: 'cilAccountLogout' } // Change 'cil-wallet' to whatever icon you prefer
  },
 
];
