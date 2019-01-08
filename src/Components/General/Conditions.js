import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField, Typography, IconButton, Divider } from '@material-ui/core';
import Create from '@material-ui/icons/Create';

import { connect } from 'react-redux';
import { getGeneral, saveDelpic } from '../../actions/generalActions';
import Modify from './Conditions/Modify';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 400,
    marginBottom: 50
  },
  paper: {
    maxWidth: 500,
    margin: 'auto',
    overflow: 'hidden'
  },
  conditions: {
    margin: 15
  },
  title: {
    marginBottom: 20
  },
  desc: {
    marginLeft: 15
  }
});

class Conditions extends Component {
  state = {
    open: false,
    delivery: false
  };

  modifyToggle = value => {
    this.setState({ open: !this.state.open, delivery: value });
  };

  componentDidMount() {
    this.props.getGeneral();
  }

  render() {
    const { classes, delPick } = this.props;
    const { open, delivery } = this.state;
    return (
      <div className={classes.root}>
        <Modify
          open={open}
          toggle={this.modifyToggle}
          data={delPick}
          delivery={delivery}
        />
        <Paper className={classes.paper}>
          <div className={classes.conditions}>
            <Typography variant="h5" component="h3" className={classes.title}>
              Conditions de retrait
              <IconButton
                color="primary"
                onClick={this.modifyToggle.bind(this, false)}
              >
                <Create />
              </IconButton>
            </Typography>
            <Typography component="p" className={classes.desc}>
              {delPick.pickup}
            </Typography>
          </div>
          <Divider light />
          <div className={classes.conditions}>
            <Typography variant="h5" component="h3" className={classes.title}>
              Conditions de livraison
              <IconButton
                color="primary"
                onClick={this.modifyToggle.bind(this, true)}
              >
                <Create />
              </IconButton>
            </Typography>
            <Typography component="p" className={classes.desc}>
              {delPick.delivery}
            </Typography>
          </div>
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
