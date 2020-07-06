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
  healthInsurance: {
    component: () => getComponent('healthInsurance', 'HealthInsurance'),
    path: '/zdravotní-pojisteni',
    title: 'Zdravotní pojištění',
  },
  invoiceAdd: {
    component: () => getComponent('invoice', 'InvoiceAdd'),
    path: '/faktury/pridat',
    title: 'Přidat fakturu',
  },
  invoiceEdit: {
    component: () => getComponent('invoice', 'InvoiceEdit'),
    path: '/faktury/:id/upravit',
    title: 'Upravit fakturu',
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
  sicknessInsurance: {
    component: () => getComponent('sicknessInsurance', 'SicknessInsurance'),
    path: '/nemocenske-pojisteni',
    title: 'Nemocenské pojištění',
  },
  socialInsurance: {
    component: () => getComponent('socialInsurance', 'SocialInsurance'),
    path: '/socialni-pojisteni',
    title: 'Sociální pojištění',
  },
  taxes: {
    component: () => getComponent('tax', 'Taxes'),
    path: '/dane',
    title: 'Daně',
  },
  timeRecords: {
    component: () => getComponent('timeRecord', 'TimeRecords'),
    path: '/odpracovany-cas',
    title: 'Odpracovaný čas',
  },
};
