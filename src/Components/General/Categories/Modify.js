import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions
} from "@material-ui/core";
import FileInput from "../../FileInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { connect } from "react-redux";
import { getCatById, modifyCategory } from "../../../actions/categoriesActions";
import { getImage, resetImage } from "../../../actions/imageActions";

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
    textAlign: "center"
  },
  formItems: {
    marginBottom: 20
  },
  snackbar: {
    backgroundColor: "#d32f2f"
  },
  image: {
    marginBottom: 15,
    width: 250
  }
});

export class Modify extends Component {
  state = {
    name: undefined,
    position: undefined
  };

  onChangeName = e => {
    this.setState({ name: e.target.value });
  };

  handlePosChange = e => {
    this.setState({ position: e.target.value });
  };

  getSelectArray = () => {};

  handleClose = () => this.setState({ snackbar: false });

  onSubmit = () => {
    const { name } = this.state.name ? this.state : this.props.selected;
    const { snap } = this.state.snap ? this.state : this.props.selected;
    const { position } = this.state;
    const { selected, categories } = this.props;
    const newCat = {
      _id: selected._id,
      name: name,
      snap: snap
    };
    if (position !== undefined) {
      categories.splice(categories.indexOf(selected), 1);
      categories.splice(position, 0, newCat);
    } else {
      categories.splice(categories.indexOf(selected), 1, newCat);
    }
    this.props.modifyCategory(categories, newCat);
    this.handleCancel();
  };

  handleCancel = () => {
    this.props.toggle();
    this.setState({ name: undefined, position: undefined });
    this.props.resetImage();
  };

  render() {
    const { classes, open, snap, categories, selected } = this.props;
    const { name, position } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleCancel}
        aria-labelledby="create-title"
      >
        <DialogTitle id="create-title">Modifier une catégorie</DialogTitle>
        <DialogContent className={classes.form}>
          <TextField
            autoFocus
            id="name"
            label="Nom"
            className={classes.formItems}
            value={name}
            defaultValue={selected.name}
            onChange={this.onChangeName}
          />

          <img
            src={snap ? snap : selected.snap}
            className={classes.image}
            alt="preview"
          />
          <FileInput title="Modifier image" name="snap" id="snapMod" />
          <Select
            value={
              position !== undefined ? position : categories.indexOf(selected)
            }
            onChange={this.handlePosChange}
            inputProps={{
              name: "order",
              id: "cat-orderxer-select"
            }}
          >
            {categories.map(y => (
              <MenuItem
                key={categories.indexOf(y) + 1}
                value={categories.indexOf(y)}
              >
                {categories.indexOf(y) + 1}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="secondary">
            Annuler
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Modify.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  snap: state.image.img,
  categories: state.categories.tags,
  selected: state.categories.selected
});

export default connect(
  mapStateToProps,
  { getCatById, modifyCategory, getImage, resetImage }
)(withStyles(styles)(Modify));
