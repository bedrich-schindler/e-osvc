import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import IconChevronLeft from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { generate } from 'shortid';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import muiStyles from './muiStyles';
import menuStructure from './menuStructure';

export class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  renderMenuItem(menuItem) {
    const { history } = this.props;

    if (menuItem.isDivider) {
      return <Divider key={generate()} />;
    }

    return (
      <ListItem
        button
        key={menuItem.path}
        onClick={() => history.push(menuItem.path)}
      >
        {menuItem.icon && (
          <ListItemIcon>
            <menuItem.icon />
          </ListItemIcon>
        )}
        <ListItemText primary={menuItem.title} />
      </ListItem>
    );
  }

  render() {
    const {
      classes,
      isMenuOpened,
      onCloseMenu,
    } = this.props;

    return (
      <Drawer
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: isMenuOpened,
          [classes.drawerClose]: !isMenuOpened,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: isMenuOpened,
            [classes.drawerClose]: !isMenuOpened,
          }),
        }}
        open={isMenuOpened}
        variant="permanent"
      >
        <div className={classes.toolbar}>
          <IconButton onClick={onCloseMenu}>
            <IconChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuStructure.map(this.renderMenuItem)}
        </List>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
};

export default withStyles(muiStyles, { withTheme: true })(withRouter(Menu));
