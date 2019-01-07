import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  DialogContentText
} from '@material-ui/core';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content'
  },
  formItems: {
    marginBottom: 20
  },
  file: {
    display: 'none'
  }
});

export class Remove extends Component {
  onSubmit = () => {
    this.props.confirm();

    this.props.toggle();
  };

  render() {
    const { classes, open, toggle } = this.props;
    return (
      <Dialog open={open} onClose={toggle} aria-labelledby="remove-title">
        <DialogTitle id="remove-title">Suppression d'image</DialogTitle>
        <DialogContent className={classes.form}>
          <DialogContentText>
            Etes vous sûr de vouloir supprimer l'image cette action est
            irréversible ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle} color="primary">
            Annuler
          </Button>
          <Button onClick={this.onSubmit} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Remove.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Remove);
