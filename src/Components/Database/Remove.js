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

import { connect } from 'react-redux';
import { getItem, deleteItem } from '../../actions/databaseActions';

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
    this.props.deleteItem(this.props.data.id);
    this.props.toggle();
  };

  componentDidUpdate() {
    this.props.getItem(this.props.id);
  }

  render() {
    const { classes, open, toggle, data } = this.props;
    return (
      <Dialog open={open} onClose={toggle} aria-labelledby="remove-title">
        <DialogTitle id="remove-title">Suppression d'un article'</DialogTitle>
        {data ? (
          <DialogContent className={classes.form}>
            <DialogContentText>
              Etes vous sûr de vouloir supprimer l'article {data.name} cette
              action est irréversible ?
            </DialogContentText>
          </DialogContent>
        ) : (
          <h3>Une erreur est survenue merci de réessayer plus tard</h3>
        )}
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

const mapStateToProps = state => ({
  data: state.database.selected
});

export default connect(
  mapStateToProps,
  { getItem, deleteItem }
)(withStyles(styles)(Remove));
