import React, { Component } from 'react';
import uuid from 'uuid';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions
} from '@material-ui/core';

import { connect } from 'react-redux';
import { addCategory } from '../../../actions/categoriesActions';

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

export class Create extends Component {
  state = {
    name: '',
    snap: ''
  };

  onChangeName = e => {
    this.setState({ name: e.target.value });
  };
  onChangeSnap = e => {
    this.setState({ snap: e.target.value });
  };

  onSubmit = () => {
    const newCat = {
      id: uuid(),
      name: this.state.name,
      snap: this.state.snap
    };
    this.props.addCategory(newCat);

    this.props.toggle();
    this.setState({ snap: '' });
  };

  render() {
    const { classes, open, toggle } = this.props;
    const { name, snap } = this.state;
    return (
      <Dialog open={open} onClose={toggle} aria-labelledby="create-title">
        <DialogTitle id="create-title">Ajouter un catégorie</DialogTitle>
        <DialogContent className={classes.form}>
          <TextField
            autoFocus
            id="name"
            label="Nom"
            className={classes.formItems}
            value={name}
            onChange={this.onChangeName}
          />
          <TextField
            id="snap"
            label="Image"
            className={classes.formItems}
            value={snap}
            onChange={this.onChangeSnap}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle} color="secondary">
            Annuler
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Creer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { addCategory }
)(withStyles(styles)(Create));
