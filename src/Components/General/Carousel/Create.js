import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions
} from '@material-ui/core';
import FileInput from '../../FileInput';

import { connect } from 'react-redux';
import { addCarousel } from '../../../actions/generalActions';
import { getImage, resetImage } from '../../../actions/imageActions';

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
  image: {
    width: 250
  }
});

export class Create extends Component {
  onCancel = () => {
    this.props.resetImage();
    this.props.toggle();
  };

  onSubmit = () => {
    this.props.addCarousel(this.props.image);
    this.onCancel();
  };

  render() {
    const { classes, open, image } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.onCancel}
        aria-labelledby="create-title"
      >
        <DialogTitle id="create-title">Ajouter une image</DialogTitle>
        <DialogContent className={classes.form}>
          {image ? (
            <img src={image} className={classes.image} />
          ) : (
            <FileInput />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancel} color="secondary">
            Annuler
          </Button>
          <Button
            onClick={image ? this.onSubmit : this.onCancel}
            color="primary"
          >
            Creer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired,
  getImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  image: state.image.img
});

export default connect(
  mapStateToProps,
  { addCarousel, getImage, resetImage }
)(withStyles(styles)(Create));
