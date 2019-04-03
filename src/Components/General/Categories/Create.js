import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Snackbar,
  SnackbarContent
} from "@material-ui/core";
import FileInput from "../../FileInput";

import { connect } from "react-redux";
import { addCategory } from "../../../actions/categoriesActions";
import { getImage, resetImage } from "../../../actions/imageActions";

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formItems: {
    marginBottom: 20
  },
  snackbar: {
    backgroundColor: "#d32f2f"
  },
  image: {
    width: 250
  }
});

export class Create extends Component {
  state = {
    name: undefined,
    snackbar: false
  };

  onChangeName = e => {
    this.setState({ name: e.target.value });
  };
  handleClose = () => this.setState({ snackbar: false });

  onSubmit = () => {
    const { name } = this.state;
    const { snap } = this.props;
    if (name === "" || snap === "") {
      this.setState({ snackbar: true });
    } else {
      const newCat = {
        name: name,
        snap: snap
      };
      this.props.addCategory(newCat);
    }
    this.handleCancel();
  };
  handleCancel = () => {
    this.props.toggle();
    this.setState({ name: undefined });
    this.props.resetImage();
  };

  render() {
    const { classes, open, snap } = this.props;
    const { name, snackbar } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleCancel}
        aria-labelledby="create-title"
      >
        <DialogTitle id="create-title">Ajouter une catégorie</DialogTitle>
        <DialogContent className={classes.form}>
          <TextField
            autoFocus
            id="name"
            label="Nom"
            className={classes.formItems}
            value={name}
            onChange={this.onChangeName}
          />
          {snap ? (
            <img src={snap} className={classes.image} alt="preview" />
          ) : (
            <FileInput />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="secondary">
            Annuler
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Creer
          </Button>
        </DialogActions>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={snackbar}
          onClose={this.handleClose}
          autoHideDuration={6000}
        >
          <SnackbarContent
            message={
              <span id="client-snackbar">Nom ou image non renseigné</span>
            }
            aria-describedby="client-snackbar"
            className={classes.snackbar}
          />
        </Snackbar>
      </Dialog>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  snap: state.image.img
});

export default connect(
  mapStateToProps,
  { addCategory, getImage, resetImage }
)(withStyles(styles)(Create));
