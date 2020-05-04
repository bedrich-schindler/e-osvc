import IconDashboard from '@material-ui/icons/Dashboard';
import IconClients from '@material-ui/icons/People';
import IconProjects from '@material-ui/icons/Business';
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
  {
    icon: IconProjects,
    path: routes.projects.path,
    title: routes.projects.title,
  },
];
