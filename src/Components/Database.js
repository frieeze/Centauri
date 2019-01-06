import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getProfile } from '../actions/profileActions';

export class Database extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.toolbar} />
        <h3>Gestion des bases de données</h3>
      </div>
    );
  }
}

const styles = theme => ({
  toolbar: {
    margin: '10em'
  }
});

Database.propTypes = {
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
)(withStyles(styles, { withTheme: true })(Database));
