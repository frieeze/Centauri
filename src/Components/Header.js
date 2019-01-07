import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {},
  menuButton: {
    marginLeft: -theme.spacing.unit
  },
  iconButtonAvatar: {
    padding: 4
  },
  button: {
    borderColor: lightColor
  }
});

class Header extends Component {
  subpages = [
    {
      page: 'Général',
      sub: ['Catégories', 'Carousel', 'Conditions']
    },
    {
      page: 'Base de données',
      sub: ['Jeux']
    },
    {
      page: 'Analytics',
      sub: ['Semaine', 'Mois', 'Année', 'Tout']
    }
  ];

  state = {
    navIndex: 0
  };

  handleChange = (event, navIndex) => {
    this.props.handleSubpage(navIndex);
  };

  render() {
    const { classes, current } = this.props;

    return (
      <React.Fragment>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="sticky"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={8}>
              <Grid item xs>
                <Typography color="inherit" variant="h5">
                  Données générales
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="sticky"
          elevation={0}
        >
          <Tabs
            value={current.subpage}
            textColor="inherit"
            onChange={this.handleChange}
          >
            {this.subpages
              .filter(item => item.page === current.page)[0]
              .sub.map(name => (
                <Tab textColor="inherit" label={name} key={name} />
              ))}
          </Tabs>
        </AppBar>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
