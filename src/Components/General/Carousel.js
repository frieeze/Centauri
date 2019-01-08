import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddIcon from '@material-ui/icons/Add';

import { connect } from 'react-redux';
import {
  getGeneral,
  addCarousel,
  deleteCarousel,
  saveDelpic
} from '../../actions/generalActions';
import { Button, CardMedia } from '@material-ui/core';

import Create from './Carousel/Create';
import Remove from './Carousel/Remove';

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
  },
  button: {
    marginTop: 30
  },
  images: {
    maxWidth: 400
  }
});

class Carousel extends Component {
  state = {
    create: false,
    remove: false,
    removeImg: ''
  };

  componentDidMount() {
    this.props.getGeneral();
  }

  onRemoveConfirm = img => {
    this.setState({
      removeImg: img
    });
    this.removeToggle();
  };

  removeImage = () => {
    this.props.deleteCarousel(this.state.removeImg);
  };

  createToggle = () => {
    this.setState({ create: !this.state.create });
  };

  removeToggle = () => {
    this.setState({ remove: !this.state.remove });
  };

  render() {
    const { remove, create } = this.state;
    const { classes, carousel } = this.props;
    return (
      <div className={classes.root}>
        <Remove
          open={remove}
          toggle={this.removeToggle}
          confirm={this.removeImage}
          name={this.state.removeName}
        />
        <Paper className={classes.paper}>
          <List component="nav" className={classes.list}>
            {carousel.map(img => (
              <ListItem key={carousel.indexOf(img)}>
                <img
                  src={img}
                  alt={'carousel-' + carousel.indexOf(img)}
                  className={classes.images}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    variant="contained"
                    color="secondary"
                    onClick={this.onRemoveConfirm.bind(this, img)}
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
      </div>
    );
  }
}

Carousel.propTypes = {
  classes: PropTypes.object.isRequired,
  getGeneral: PropTypes.func.isRequired,
  carousel: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  carousel: state.general.carousel
});

export default connect(
  mapStateToProps,
  {
    getGeneral,
    addCarousel,
    deleteCarousel,
    saveDelpic
  }
)(withStyles(styles)(Carousel));
