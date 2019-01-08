import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Chip,
  Paper
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Create from '@material-ui/icons/Create';

import { connect } from 'react-redux';
import { addItem } from '../../actions/databaseActions';
import { getCategoriesNames } from '../../actions/categoriesActions';

import uuid from 'uuid';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
  form: {
    margin: 20,
    width: '50%'
  },
  formItems: {
    width: '40%',
    marginBottom: 20,
    marginRight: 10
  },
  images: {
    width: 150,
    height: 100
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});
export class Add extends Component {
  state = {
    modifySnap: false,
    newPic: '',
    pic: [],
    tags: '',
    name: '',
    dimension: '',
    time: '',
    aim: '',
    players: '',
    pickup: '',
    price: '',
    snap: '',
    tags: []
  };

  modifySnap = () => {
    this.setState({ modifySnap: true });
  };

  handlePicDelete = pic => {
    this.setState({
      pic: this.state.pic.filter(img => img !== pic)
    });
  };

  handlePicAdd = () => {
    this.setState({
      pic: [this.state.newPic, ...this.state.pic],
      newPic: ''
    });
  };

  handleSelectChange = e => {
    this.setState({ tags: e.target.value });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSwitch = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  onSubmit = () => {
    const newItem = {
      id: uuid(),
      pic: this.state.pic,
      tags: this.state.tags,
      name: this.state.name,
      desc: {
        dimension: this.state.dimension,

        time: this.state.time,
        aim: this.state.aim,
        players: this.state.players,
        pickup: this.state.pickup
      },
      price: this.state.price,
      snap: this.state.snap,
      tags: this.state.tags
    };
    this.props.addItem(newItem);

    this.resetState();
  };

  resetState = () => {
    this.setState({
      modifySnap: false,
      pic: [],
      tags: '',
      name: '',
      dimension: '',
      time: '',
      aim: '',
      players: '',
      pickup: '',
      price: '',
      snap: '',
      tags: [],
      newPic: undefined
    });
  };

  componentDidMount() {
    this.props.getCategoriesNames();
  }

  render() {
    const { classes, data } = this.props;
    const { modifySnap } = this.state;
    return (
      <div className={classes.root}>
        <Paper>
          <DialogContent className={classes.root}>
            <div className={classes.form}>
              <TextField
                value={this.state.name}
                id="name"
                label="Nom"
                name="name"
                className={classes.formItems}
                onChange={this.handleChange}
              />
              <TextField
                value={this.state.dimension}
                id="dimensions"
                name="dimension"
                label="Dimensions"
                className={classes.formItems}
                onChange={this.handleChange}
              />
              <TextField
                value={this.state.time}
                id="time"
                name="time"
                label="Temps de montage"
                className={classes.formItems}
                onChange={this.handleChange}
              />
              <TextField
                value={this.state.aim}
                id="aim"
                name="aim"
                label="Public"
                onChange={this.handleChange}
                className={classes.formItems}
              />
              <TextField
                value={this.state.players}
                id="players"
                name="players"
                label="Nombre de personnes"
                className={classes.formItems}
                onChange={this.handleChange}
              />
              <TextField
                value={this.state.price}
                id="price"
                name="price"
                label="Prix (HT) hors livraison"
                className={classes.formItems}
                onChange={this.handleChange}
              />
              <FormControl className={classes.formItems}>
                <InputLabel htmlFor="select-multiple-chip">
                  Catégories
                </InputLabel>
                <Select
                  multiple
                  name="name"
                  value={this.state.tags}
                  onChange={this.handleSelectChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {this.props.categories.map(cat => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.pickup}
                    value="pickup"
                    name="pickup"
                    color="primary"
                    onChange={this.handleSwitch}
                  />
                }
                label="Retrait à l'entrepot"
              />
            </div>
            <div className={classes.form}>
              <List className={classes.list}>
                <ListItem key="snap">
                  <img
                    src={
                      this.state.snap
                        ? this.state.snap
                        : 'https://via.placeholder.com/500x300.png?text=Aperçu'
                    }
                    className={classes.images}
                    alt="Aperçu de l'article"
                  />
                  <ListItemSecondaryAction>
                    {modifySnap ? (
                      <TextField
                        label="URL"
                        id="snap"
                        name="snap"
                        onChange={this.handleChange}
                      />
                    ) : (
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={this.modifySnap}
                      >
                        <Create />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
                {this.state.pic.map(img => (
                  <ListItem
                    key={
                      'img-' +
                      (this.state.pic ? this.state.pic : data.pic).indexOf(img)
                    }
                  >
                    <img
                      src={img}
                      className={classes.images}
                      alt="Aperçu de l'article"
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        variant="contained"
                        color="secondary"
                        onClick={this.handlePicDelete.bind(this, img)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Typography variant="subtitle1">Ajouter une image :</Typography>
              <List>
                <ListItem>
                  <TextField
                    value={this.state.newPic}
                    label="URL"
                    id="newPic"
                    name="newPic"
                    onChange={this.handleChange}
                  />
                  <ListItemSecondaryAction>
                    <Fab color="primary" onClick={this.handlePicAdd}>
                      <AddIcon />
                    </Fab>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <Typography variant="body2">
                Nombre d'images recommandé : 3
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetState} color="secondary">
              Reset
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Paper>
      </div>
    );
  }
}

Add.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.database.selected,
  categories: state.categories.names
});

export default connect(
  mapStateToProps,
  { addItem, getCategoriesNames }
)(withStyles(styles)(Add));
