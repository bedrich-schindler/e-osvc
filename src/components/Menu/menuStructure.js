import IconDashboard from '@material-ui/icons/Dashboard';
import IconClients from '@material-ui/icons/People';
import IconInvoices from '@material-ui/icons/Description';
import IconPayments from '@material-ui/icons/Payment';
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
  { isDivider: true },
  {
    icon: IconInvoices,
    path: routes.invoices.path,
    title: routes.invoices.title,
  },
  { isDivider: true },
  {
    icon: IconPayments,
    path: routes.socialInsurance.path,
    title: routes.socialInsurance.title,
  },
  {
    icon: IconPayments,
    path: routes.healthInsurance.path,
    title: routes.healthInsurance.title,
  },
  {
    icon: IconPayments,
    path: routes.sicknessInsurance.path,
    title: routes.sicknessInsurance.title,
  },
];
