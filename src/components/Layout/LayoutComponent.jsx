import PropTypes from 'prop-types';
import React from 'react';
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
      children,
      logout,
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
          {children}
          <Timer />
        </main>
      </div>
    );
  }
}

LayoutComponent.defaultProps = {
  children: null,
  floatingActions: null,
};

LayoutComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default LayoutComponent;
