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
  login: {
    component: () => getComponent('login', 'Login'),
    isAnonymous: true,
    path: '/prihlaseni',
    title: 'Přihlášení',
  },
  registration: {
    component: () => getComponent('registration', 'Registration'),
    isAnonymous: true,
    path: '/vytvoreni-uctu',
    title: 'Vytvoření účtu',
  },
};
