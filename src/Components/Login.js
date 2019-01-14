import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import image from '../assets/img/background.jpg';

import { logIn, logOut } from '../actions/profileActions';
import { connect } from 'react-redux';
import { Snackbar, SnackbarContent } from '@material-ui/core';

const styles = {
  image: {
    filter: 'blur(0.5em)'
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: 500
  },
  form: { marginLeft: 70 },
  formItem: { marginBottom: 20 },
  button: {
    marginTop: 20,
    width: 200
  },
  snackbar: {
    backgroundColor: '#d32f2f'
  }
};

export class Login extends Component {
  state = {
    user: undefined,
    pwd: undefined
  };
  resetState = () => {
    this.setState({ user: undefined, pwd: undefined });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.logIn(this.state.user, this.state.pwd);
    this.resetState();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSnackbar = () => this.props.logOut();

  render() {
    const { user, pwd } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <img src={image} alt=" " className={classes.image} />
        <Dialog className={classes.dialog} open={true} fullWidth={true}>
          <DialogTitle id="connexion">Connexion</DialogTitle>
          <DialogContent className={classes.form}>
            <form onSubmit={this.onSubmit}>
              <TextField
                label="Nom d'utilisateur"
                className={classes.formItem}
                name="user"
                value={user}
                onChange={this.handleChange}
              />
              <TextField
                label="Mot de passe"
                name="pwd"
                value={pwd}
                onChange={this.handleChange}
                className={classes.formItem}
                type="password"
              />
              <Button
                variant="contained"
                color="primary"
                className={classNames(classes.formItem, classes.button)}
                type="submit"
              >
                Connexion
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={this.props.logError}
          onClose={this.handleSnackbar}
          autoHideDuration={6000}
        >
          <SnackbarContent
            message={
              <span id="client-snackbar">Erreur d'authentification</span>
            }
            aria-describedby="client-snackbar"
            className={classes.snackbar}
          />
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.profile.isLogged,
  logError: state.profile.logError
});

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { logIn, logOut }
)(withStyles(styles)(Login));
