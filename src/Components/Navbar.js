import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Button,
  Typography,
  Toolbar,
  AppBar,
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  List,
  ListItemText
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsRounded from '@material-ui/icons/SettingsRounded';
import DnsRounded from '@material-ui/icons/DnsRounded';
import HomeRounded from '@material-ui/icons/HomeRounded';

import { connect } from 'react-redux';
import { getProfile } from '../actions/profileActions';

class Navbar extends Component {
  state = {
    drawerIsOpen: false
  };
  toggleDrawer = () => {
    this.setState({
      drawerIsOpen: !this.state.drawerIsOpen
    });
  };

  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { isLogged, classes, changeCurrentPage } = this.props;
    const { drawerIsOpen } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" color="inherit" className={classes.grow}>
              Centauri
            </Typography>
            {isLogged ? (
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          onClose={this.drawerToggle}
          open={drawerIsOpen}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <div className={classes.toolbar} />
            <Divider />
            <List>
              <ListItem button onClick={changeCurrentPage.bind(this, 'home')}>
                <ListItemIcon>
                  <HomeRounded className={classes.texts} />
                </ListItemIcon>
                <ListItemText
                  primary="Accueil"
                  className={classes.texts}
                  disableTypography
                />
              </ListItem>
              <ListItem
                button
                onClick={changeCurrentPage.bind(this, 'general')}
              >
                <ListItemIcon>
                  <SettingsRounded className={classes.texts} />
                </ListItemIcon>
                <ListItemText
                  primary="Général"
                  className={classes.texts}
                  disableTypography
                />
              </ListItem>
              <ListItem
                button
                onClick={changeCurrentPage.bind(this, 'database')}
              >
                <ListItemIcon>
                  <DnsRounded className={classes.texts} />
                </ListItemIcon>
                <ListItemText
                  primary="Base de Données"
                  className={classes.texts}
                  disableTypography
                />
              </ListItem>
            </List>
            <Divider />
          </div>
        </Drawer>
      </div>
    );
  }
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    fontFamily: 'Potra',
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  drawer: {
    width: drawerWidth,
    flewShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#424242'
  },
  toolbar: theme.mixins.toolbar,
  texts: {
    color: theme.palette.common.white
  }
});

Navbar.propTypes = {
  getProfile: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isLogged: state.profile.isLogged,
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  {
    getProfile
  }
)(withStyles(styles, { withTheme: true })(Navbar));
