import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));

// tokens
const Issuer = React.lazy(()=>import('./views/Tokens/Issuer'));
const Management = React.lazy(()=>import('./views/Tokens/Management'));
const Wallet = React.lazy(()=>import('./views/Tokens/Wallet'));

// contacts
const Organizations = React.lazy(()=>import('./views/Contacts/Organizations'));
const Clients = React.lazy(()=>import('./views/Contacts/Clients'));
const General = React.lazy(()=>import('./views/Contacts/General'));

// history
const Payments = React.lazy(()=>import('./views/History/Payments'));
const Settlement = React.lazy(()=>import('./views/History/Settlement'));
const Activity = React.lazy(()=>import('./views/History/Activity'));

// Settings
const Account = React.lazy(()=>import('./views/Settings/Account'));
const Security = React.lazy(()=>import('./views/Settings/Security'));
const Blockchain = React.lazy(()=>import('./views/Settings/Blockchain'));

// pay
const Upgrade = React.lazy(()=>import('./views/Upgrade'));

// task
const Task = React.lazy(()=>import('./components/Task'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // tokens
  { path: '/tokens', name: 'Tokens', component: Issuer, exact: true},
  { path: '/tokens/issuer', name: 'Issuer', component: Issuer},
  { path: '/tokens/management', name: 'Management', component: Management},
  { path: '/tokens/wallet', name: 'Wallet', component: Wallet},

  // contacts
  { path: '/contacts', name: 'Contacts', component: Organizations, exact: true},
  { path: '/contacts/organizations', name: 'Organizations', component: Organizations},
  { path: '/contacts/clients', name: 'Clients', component: Clients},
  { path: '/contacts/General', name: 'General', component: General},

  // history
  { path: '/history', name: 'History', component: Payments, exact: true},
  { path: '/history/payments', name: 'Payments', component: Payments},
  { path: '/history/settlement', name: 'Settlement', component: Settlement},
  { path: '/history/activity', name: 'Activity', component: Activity},

  // settings
  { path: '/settings', name: 'Settings', component: Account, exact: true},
  { path: '/settings/account', name: 'Account', component: Account},
  { path: '/settings/security', name: 'Security', component: Security},
  { path: '/settings/blockchain', name: 'Blockchain', component: Blockchain},

  // pay
  { path: '/upgrade', name: 'Upgrade', component: Upgrade, exact: true},

  // task 
  { path: '/task', name: 'Task', component: Task, exact: true},
];

export default routes;
