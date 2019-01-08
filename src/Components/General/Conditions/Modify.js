import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';

import { connect } from 'react-redux';
import { getGeneral, saveDelpic } from '../../../actions/generalActions';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '100%'
  },
  formItems: {
    marginBottom: 20
  }
});
export class Modify extends Component {
  state = {
    value: ''
  };

  componentDidMount() {
    this.props.getGeneral();
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = () => {
    const newDelPick = {
      delivery: this.props.delivery
        ? this.state.value
        : this.props.data.delivery,
      pickup: this.props.delivery ? this.props.data.pickup : this.state.value
    };

    this.props.saveDelpic(newDelPick);

    this.props.toggle();
  };

  render() {
    const { open, toggle, classes, data, delivery } = this.props;
    return (
      <Dialog
        open={open}
        onClose={toggle}
        aria-labelledby="modify-title"
        className={classes.root}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="modify-title">Modifier</DialogTitle>
        <DialogContent className={classes.form}>
          <TextField
            id="pickupConditions"
            label="Condition de retrait"
            multiline
            rows="4"
            defaultValue={delivery ? data.delivery : data.pickup}
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle} color="secondary">
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
  data: state.general.pickdelinfo
});

export default connect(
  mapStateToProps,
  { getGeneral, saveDelpic }
)(withStyles(styles)(Modify));
