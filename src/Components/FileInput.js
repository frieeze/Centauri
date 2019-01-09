import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';

import { connect } from 'react-redux';
import { uploadImage, resetImage, getImage } from '../actions/imageActions';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  image: {
    width: 250,
    height: 175
  },
  preview: {
    display: 'flex'
  },
  previewButton: {
    margin: 'auto',
    height: 'auto'
  }
});

export class FileInput extends Component {
  state = {
    preview: false,
    img: undefined
  };

  handleChange = e => {
    this.setState({
      img: e.target.files[0],
      preview: true
    });
  };

  onSubmit = e => {
    const data = new FormData();
    data.append('PassionLoisir', this.state.img);
    this.props.uploadImage(data);
    this.onCancel();
  };

  onCancel = () => {
    this.setState({
      img: undefined,
      preview: false
    });
  };

  componentWillUpdate() {
    this.props.getImage();
  }

  render() {
    const { classes, image, uploading, title } = this.props;
    const { preview, img } = this.state;

    return (
      <div>
        {preview ? (
          <div className={classes.preview}>
            <img
              src={URL.createObjectURL(img)}
              alt="Aperçu"
              className={classes.image}
              onClick={this.props.resetImage}
            />

            <IconButton
              className={classes.previewButton}
              color="primary"
              onClick={this.onSubmit}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              className={classes.previewButton}
              color="secondary"
              onClick={this.onCancel}
            >
              <Clear />
            </IconButton>
          </div>
        ) : uploading || image ? (
          uploading ? (
            <CircularProgress />
          ) : (
            <img src={image} alt="Aperçu" className={classes.image} />
          )
        ) : (
          <div>
            <input
              accept="image/*"
              className={classes.input}
              id="flat-button-file"
              type="file"
              onChange={this.handleChange}
            />

            <label htmlFor="flat-button-file">
              <Button
                component="span"
                variant="contained"
                color="primary"
                className={classes.formItems}
              >
                {title ? title : 'Ajouter une Image'}
              </Button>
            </label>
          </div>
        )}
      </div>
    );
  }
}

FileInput.propTypes = {
  classes: PropTypes.object.isRequired,
  getImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  uploading: state.image.uploading,
  image: state.image.img
});

export default connect(
  mapStateToProps,
  { uploadImage, resetImage, getImage }
)(withStyles(styles)(FileInput));
