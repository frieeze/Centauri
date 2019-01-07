import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions
} from '@material-ui/core';

import { connect } from 'react-redux';
import { addCarousel } from '../../../actions/generalActions';

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
    snap: ''
  };
  onChangeSnap = e => {
    this.setState({ snap: e.target.value });
  };

  onSubmit = () => {
    this.props.addCarousel(this.state.snap);

    this.props.toggle();
    this.setState({ snap: '' });
  };

  render() {
    const { classes, open, toggle } = this.props;
    const { snap } = this.state;
    return (
      <Dialog open={open} onClose={toggle} aria-labelledby="create-title">
        <DialogTitle id="create-title">Ajouter une image</DialogTitle>
        <DialogContent className={classes.form}>
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

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addCarousel }
)(withStyles(styles)(Create));
