import Badge from '@material-ui/core/Badge';
import IconDashboard from '@material-ui/icons/Dashboard';
import IconClients from '@material-ui/icons/People';
import IconInvoices from '@material-ui/icons/Description';
import IconPayments from '@material-ui/icons/Payment';
import IconProjects from '@material-ui/icons/Business';
import IconTimeRecords from '@material-ui/icons/Timer';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import routes from '../../routes';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.grey[600],
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    right: 2,
    top: 13,
  },
}))(Badge);

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
    icon: IconTimeRecords,
    path: routes.timeRecords.path,
    title: routes.timeRecords.title,
  },
  { isDivider: true },
  {
    icon: () => (
      <StyledBadge
        badgeContent="D"
        color="primary"
      >
        <IconPayments />
      </StyledBadge>
    ),
    path: routes.taxes.path,
    title: routes.taxes.title,
  },
  {
    icon: () => (
      <StyledBadge
        badgeContent="S"
        color="primary"
      >
        <IconPayments />
      </StyledBadge>
    ),
    path: routes.socialInsurance.path,
    title: routes.socialInsurance.title,
  },
  {
    icon: () => (
      <StyledBadge
        badgeContent="Z"
        color="primary"
      >
        <IconPayments />
      </StyledBadge>
    ),
    path: routes.healthInsurance.path,
    title: routes.healthInsurance.title,
  },
  {
    icon: () => (
      <StyledBadge
        badgeContent="N"
        color="primary"
      >
        <IconPayments />
      </StyledBadge>
    ),
    path: routes.sicknessInsurance.path,
    title: routes.sicknessInsurance.title,
  },
];
