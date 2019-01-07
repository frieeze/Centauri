import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';

import { connect } from 'react-redux';
import { modifyCategory } from '../../../actions/categoriesActions';

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
export class Modify extends Component {
  state = {
    id: this.props.id,
    name: this.props.name,
    snap: this.props.snap
  };

  onChangeName = e => {
    this.setState({ name: e.target.value });
  };
  onChangeSnap = e => {
    this.setState({ snap: e.target.value });
  };

  /*componentDidMount() {
    if (this.state.id === '') {
      this.setState({
        id: this.props.id,
        name: this.props.name,
        snap: this.props.snap
      });
    }
  }*/

  onSubmit = () => {
    const newCat = {
      id: this.state.id,
      name: this.state.name,
      snap: this.state.snap
    };
    this.props.modifyCategory(newCat);

    this.props.toggle();
  };

  render() {
    const { open, toggle, classes } = this.props;
    return (
      <Dialog open={open} onClose={toggle} aria-labelledby="modify-title">
        <DialogTitle id="modify-title">Modifier</DialogTitle>
        <DialogContent className={classes.form}>
          <TextField
            autoFocus
            id="name"
            label="Nom"
            className={classes.formItems}
            value={this.state.name}
            onChange={this.onChangeName}
          />
          <TextField
            id="snap"
            label="Image"
            className={classes.formItems}
            value={this.state.snap}
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

Modify.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { modifyCategory }
)(withStyles(styles)(Modify));
