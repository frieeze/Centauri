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
  Chip
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Create from '@material-ui/icons/Create';

import { connect } from 'react-redux';
import { getItem, modifyItem } from '../../actions/databaseActions';
import { getCategoriesNames } from '../../actions/categoriesActions';

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
export class Modify extends Component {
  state = {
    modifySnap: false,
    tags: undefined
  };

  modifySnap = () => {
    this.setState({ modifySnap: true });
  };

  handlePicDelete = pic => {
    this.setState({
      pic: (this.state.pic ? this.state.pic : this.props.data.pic).filter(
        img => img !== pic
      )
    });
  };

  handlePicAdd = () => {
    this.setState({
      pic: [
        this.state.newPic,
        ...(this.state.pic ? this.state.pic : this.props.data.pic)
      ]
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
      _id: this.props.data._id,
      pic: this.state.pic ? this.state.pic : this.props.data.pic,
      name: this.state.name ? this.state.name : this.props.data.name,
      desc: {
        dimension: this.state.dimension
          ? this.state.dimension
          : this.props.data.desc.dimension,
        time: this.state.time ? this.state.time : this.props.data.desc.time,
        aim: this.state.aim ? this.state.aim : this.props.data.desc.aim,
        players: this.state.players
          ? this.state.players
          : this.props.data.desc.players,
        pickup:
          this.state.pickup !== undefined
            ? this.state.pickup
            : this.props.data.desc.pickup
      },
      price: this.state.price ? this.state.price : this.props.data.price,
      snap: this.state.snap ? this.state.snap : this.props.data.snap,
      tags: this.state.tags ? this.state.tags : this.props.categories
    };
    this.props.modifyItem(newItem);

    this.onCancel();
  };

  onCancel = () => {
    this.setState({
      modifySnap: false,
      pic: undefined,
      name: undefined,
      dimension: undefined,
      time: undefined,
      aim: undefined,
      players: undefined,
      pickup: undefined,
      price: undefined,
      snap: undefined,
      tags: undefined
    });
    this.props.toggle();
  };
  componentDidMount() {
    this.props.getCategoriesNames();
  }

  componentDidUpdate() {
    this.props.getItem(this.props.id);
  }

  render() {
    const { open, classes, data } = this.props;
    const { modifySnap } = this.state;
    return (
      <Dialog
        open={open}
        aria-labelledby="modify-title"
        maxWidth="lg"
        onClose={this.onCancel}
      >
        <DialogTitle id="modify-title">Modifier</DialogTitle>
        {data ? (
          <DialogContent className={classes.root}>
            <div className={classes.form}>
              <TextField
                defaultValue={data.name}
                id="name"
                label="Nom"
                name="name"
                className={classes.formItems}
                onChange={this.handleChange}
              />
              <TextField
                defaultValue={data.desc.dimension}
                id="dimensions"
                name="dimension"
                label="Dimensions"
                className={classes.formItems}
                onChange={this.handleChange}
              />
              <TextField
                defaultValue={data.desc.time}
                id="time"
                name="time"
                label="Temps de montage"
                className={classes.formItems}
                onChange={this.handleChange}
              />
              <TextField
                defaultValue={data.desc.aim}
                id="aim"
                name="aim"
                label="Public"
                onChange={this.handleChange}
                className={classes.formItems}
              />
              <TextField
                defaultValue={data.desc.players}
                id="players"
                name="players"
                label="Nombre de personnes"
                className={classes.formItems}
                onChange={this.handleChange}
              />
              <TextField
                defaultValue={data.price}
                id="price"
                name="price"
                label="Prix (HT) hors livraison"
                className={classes.formItems}
                onChange={this.handleChange}
              />
              <FormControl className={classes.formItems}>
                <InputLabel htmlFor="select-multiple-chip">
                  Catérogies
                </InputLabel>
                <Select
                  multiple
                  name="name"
                  value={
                    this.state.tags ? this.state.tags : this.props.data.tags
                  }
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
                    defaultChecked={data.desc.pickup}
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
                    src={this.state.snap ? this.state.snap : data.snap}
                    className={classes.images}
                    alt="Aperçu de l'article"
                  />
                  <ListItemSecondaryAction>
                    {modifySnap ? (
                      <TextField
                        defaultValue={data.snap}
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
                {(this.state.pic ? this.state.pic : data.pic).map(img => (
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
                    label="URL"
                    id="newPic"
                    name="newPic"
                    onChange={this.handleChange}
                  />
                  <ListItemSecondaryAction>
                    <Fab
                      color="primary"
                      onClick={this.handlePicAdd}
                      size="small"
                    >
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
        ) : (
          <h3>Une erreur est survenue merci de réessayer plus tard</h3>
        )}
        <DialogActions>
          <Button onClick={this.onCancel} color="secondary">
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
  data: state.database.selected,
  categories: state.categories.names
});

export default connect(
  mapStateToProps,
  { getItem, modifyItem, getCategoriesNames }
)(withStyles(styles)(Modify));
