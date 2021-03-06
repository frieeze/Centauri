import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";

import { connect } from "react-redux";
import {
  getCategories,
  getCatById,
  deleteCategory
} from "../../actions/categoriesActions";
import { Button } from "@material-ui/core";
import Create from "./Categories/Create";
import Remove from "./Categories/Remove";
import Modify from "./Categories/Modify";

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 400,
    marginBottom: 50,
    textAlign: "center"
  },
  paper: {
    maxWidth: 500,
    margin: "auto",
    overflow: "hidden"
  },
  button: {
    marginTop: 30
  }
});

class Categories extends Component {
  state = {
    modify: false,
    create: false,
    remove: false,
    removeName: "",
    removeId: ""
  };

  componentDidMount() {
    this.props.getCategories();
  }

  onRemoveConfirm = cat => {
    this.setState({
      removeName: cat.name,
      removeId: cat._id
    });
    this.removeToggle();
  };

  removeCategory = () => {
    this.props.deleteCategory(this.state.removeId);
  };

  onModify = cat => {
    this.props.getCatById(cat._id);
    this.modifyToggle();
  };

  modifyToggle = () => {
    this.setState({ modify: !this.state.modify });
  };

  createToggle = () => {
    this.setState({ create: !this.state.create });
  };

  removeToggle = () => {
    this.setState({ remove: !this.state.remove });
  };

  render() {
    const { remove, create, modify } = this.state;
    const { classes, categories } = this.props;
    const { tags } = categories;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <List component="nav" className={classes.list}>
            {tags.map(cat => (
              <ListItem key={cat._id}>
                <ListItemText primary={cat.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    variant="contained"
                    color="primary"
                    onClick={this.onModify.bind(this, cat)}
                  >
                    <CreateIcon className={classes.rightIcon} />
                  </IconButton>
                  <IconButton
                    variant="contained"
                    color="secondary"
                    onClick={this.onRemoveConfirm.bind(this, cat)}
                  >
                    <DeleteIcon className={classes.rightIcon} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={this.createToggle}
        >
          Ajouter
          <AddIcon />
        </Button>
        <Create open={create} toggle={this.createToggle} />
        <Modify
          open={modify}
          toggle={this.modifyToggle}
          current={this.state.modifyId}
        />
        <Remove
          open={remove}
          toggle={this.removeToggle}
          confirm={this.removeCategory}
          name={this.state.removeName}
        />
      </div>
    );
  }
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { getCategories, getCatById, deleteCategory }
)(withStyles(styles)(Categories));
