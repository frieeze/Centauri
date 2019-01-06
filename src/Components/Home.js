import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getProfile } from '../actions/profileActions';

export class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.toolbar} />
        <h2>Bienvenue sur votre page Centauri</h2>
      </div>
    );
  }
}

const styles = theme => ({
  toolbar: {
    margin: '10em'
  }
});

Home.propTypes = {
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
)(withStyles(styles, { withTheme: true })(Home));
