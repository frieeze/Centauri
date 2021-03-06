import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Chip,
  Paper,
  Snackbar,
  SnackbarContent
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FileInput from "../FileInput";

import { connect } from "react-redux";
import { addItem } from "../../actions/databaseActions";
import { getCategoriesNames } from "../../actions/categoriesActions";
import { getImage, resetImage, deletePic } from "../../actions/imageActions";

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
    display: "flex",
    flexDirection: "row"
  },
  form: {
    margin: 20,
    width: "50%"
  },
  formItems: {
    width: "40%",
    marginBottom: 20,
    marginRight: 10
  },
  images: {
    width: 150,
    height: 100
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  snackbar: {
    backgroundColor: "#d32f2f"
  }
});
export class Add extends Component {
  state = {
    snackbar: false,
    name: undefined,
    dimension: undefined,
    time: undefined,
    aim: undefined,
    players: undefined,
    pickup: undefined,
    price: undefined,
    tags: []
  };

  handlePicDelete = pic => {
    this.props.deletePic(pic);
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

  handleSnackbar = () => this.setState({ snackbar: false });

  onSubmit = () => {
    const newItem = {
      pic: this.props.pic,
      name: this.state.name,
      desc: {
        dimension: this.state.dimension,

        time: this.state.time,
        aim: this.state.aim,
        players: this.state.players,
        pickup: this.state.pickup
      },
      price: this.state.price,
      snap: this.props.snap,
      tags: this.state.tags
    };
    this.validator(newItem)
      ? this.sendItem(newItem)
      : this.setState({ snackbar: true });
  };

  sendItem = item => {
    this.props.addItem(item);
    this.resetState();
    this.props.resetImage();
  };

  validator = item => {
    if (item.tags === []) return false;
    switch (undefined) {
      case item.name:
        return false;
      case item.desc:
        return false;
      case item.price:
        return false;
      case item.snap:
        return false;
      default:
        return true;
    }
  };

  resetState = () => {
    this.setState({
      name: undefined,
      dimension: undefined,
      time: undefined,
      aim: undefined,
      players: undefined,
      pickup: undefined,
      price: undefined,
      tags: []
    });
  };

  componentDidMount() {
    this.props.getCategoriesNames();
  }

  render() {
    const { classes } = this.props;
    const { snackbar } = this.state;
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
                      this.props.snap
                        ? this.props.snap
                        : "https://via.placeholder.com/500x300.png?text=Aperçu"
                    }
                    className={classes.images}
                    alt="Aperçu de l'article"
                  />
                  <ListItemSecondaryAction>
                    <FileInput title="Modifier" name="snap" id="snapMod" />
                  </ListItemSecondaryAction>
                </ListItem>
                {this.props.pic.map(img => (
                  <ListItem key={"img-" + this.props.pic.indexOf(img)}>
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
                  <FileInput id="addPic" name="pic" />
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={snackbar}
          onClose={this.handleSnackbar}
          autoHideDuration={6000}
        >
          <SnackbarContent
            message={
              <span id="client-snackbar">
                Des champs essentiels ne sont pas renseignés
              </span>
            }
            aria-describedby="client-snackbar"
            className={classes.snackbar}
          />
        </Snackbar>
      </div>
    );
  }
}

Add.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories.names,
  image: state.image.img,
  snap: state.image.snap,
  pic: state.image.pic
});

export default connect(
  mapStateToProps,
  { addItem, getCategoriesNames, getImage, resetImage, deletePic }
)(withStyles(styles)(Add));
