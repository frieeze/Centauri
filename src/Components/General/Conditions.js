import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { getGeneral, saveDelpic } from '../../actions/generalActions';
import { TextField } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 400,
    marginBottom: 50,
    textAlign: 'center'
  },
  paper: {
    maxWidth: 500,
    margin: 'auto',
    overflow: 'hidden'
  }
});

class Conditions extends Component {
  state = {};

  componentDidMount() {
    this.props.getGeneral();
  }

  render() {
    const { remove, create } = this.state;
    const { classes, carousel } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TextField
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows="4"
            defaultValue="Default Value"
            className={classes.textField}
            margin="normal"
          />
        </Paper>
      </div>
    );
  }
}

Conditions.propTypes = {
  classes: PropTypes.object.isRequired,
  getGeneral: PropTypes.func.isRequired,
  delPick: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  delPick: state.general.pickdelinfo
});

export default connect(
  mapStateToProps,
  {
    getGeneral,
    saveDelpic
  }
)(withStyles(styles)(Conditions));
