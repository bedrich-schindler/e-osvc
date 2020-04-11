import IconDashboard from '@material-ui/icons/Dashboard';
import IconClients from '@material-ui/icons/People';
import routes from '../../routes';

export default [
  {
    icon: IconDashboard,
    path: routes.dashboard.path,
    title: routes.dashboard.title,
  },
  { isDivider: true },
  {
    icon: IconClients,
    path: routes.clients.path,
    title: routes.clients.title,
  },
];
