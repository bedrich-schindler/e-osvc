import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import { generate } from 'shortid';
import { Header } from '../Header';
import { Menu } from '../Menu';
import { NotificationCenter } from '../NotificationCenter';
import { Timer } from '../Timer';
import styles from './styles.scss';

class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpened: false,
    };

    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
  }

  handleOpenMenu() {
    this.setState({ isMenuOpened: true });
  }

  handleCloseMenu() {
    this.setState({ isMenuOpened: false });
  }

  render() {
    const {
      actions,
      children,
      logout,
      title,
      user,
    } = this.props;
    const { isMenuOpened } = this.state;

    return (
      <div>
        <div className={styles.root}>
          <Header
            isMenuOpened={isMenuOpened}
            onLogout={logout}
            onOpenMenu={this.handleOpenMenu}
            title="eOSVČ"
            user={user}
          />
          <Menu
            isMenuOpened={isMenuOpened}
            onCloseMenu={this.handleCloseMenu}
          />
        </div>
        <main className={styles.content}>
          <NotificationCenter />
          <Box mb={5} mt={2}>
            <Grid
              alignItems="center"
              container
              direction="row"
              justify="space-between"
              spacing={5}
            >
              <Grid item>
                <h1 style={{ margin: 0 }}>
                  {title}
                </h1>
              </Grid>
              {actions && (
                <Grid item>
                  <Grid
                    alignItems="center"
                    container
                    direction="row"
                    justify="space-between"
                    spacing={1}
                  >
                    {actions.map((action) => (
                      <Grid
                        item
                        key={generate()}
                      >
                        {action}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Box>
          {children}
          <Timer />
        </main>
      </div>
    );
  }
}

LayoutComponent.defaultProps = {
  actions: null,
  children: null,
};

LayoutComponent.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  logout: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default LayoutComponent;
