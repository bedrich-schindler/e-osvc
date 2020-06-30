const getComponent = (
  folderName,
  componentName,
) => require(`./pages/${folderName}`)[`${componentName}Page`]; // eslint-disable-line

export default {
  clients: {
    component: () => getComponent('client', 'Clients'),
    path: '/klienti',
    title: 'Klienti',
  },
  dashboard: {
    component: () => getComponent('dashboard', 'Dashboard'),
    path: '/',
    title: 'Přehled',
  },
  invoiceAdd: {
    component: () => getComponent('invoice', 'InvoiceAdd'),
    path: '/faktury/pridat',
    title: 'Přidat fakturu',
  },
  invoiceDetail: {
    component: () => getComponent('invoice', 'InvoiceDetail'),
    path: '/faktury/:id/detail',
    title: 'Detail faktury',
  },
  invoices: {
    component: () => getComponent('invoice', 'Invoices'),
    path: '/faktury',
    title: 'Faktury',
  },
  login: {
    component: () => getComponent('login', 'Login'),
    isAnonymous: true,
    path: '/prihlaseni',
    title: 'Přihlášení',
  },
  projects: {
    component: () => getComponent('project', 'Projects'),
    path: '/projekty',
    title: 'Projekty',
  },
  registration: {
    component: () => getComponent('registration', 'Registration'),
    isAnonymous: true,
    path: '/vytvoreni-uctu',
    title: 'Vytvoření účtu',
  },
};
