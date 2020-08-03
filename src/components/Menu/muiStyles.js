export const SIDEBAR_WIDTH = 255;

export default (theme) => ({
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: SIDEBAR_WIDTH,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  },
  drawer: {
    flexShrink: 0,
    left: 0,
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: SIDEBAR_WIDTH,
    zIndex: 1000,
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    [theme.breakpoints.down(768)]: {
      width: 0,
    },
    width: theme.spacing(7) + 1,
  },
  drawerOpen: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: SIDEBAR_WIDTH,
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});
