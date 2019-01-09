import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Create from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import { getDatabase } from '../../actions/databaseActions';
import Modify from './Modify';
import Remove from './Remove';
import Add from './Add';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%',
    height: 400
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
});

class Database extends Component {
  state = {
    modify: false,
    create: false,
    remove: false,
    current: '0'
  };

  componentDidMount() {
    this.props.getDatabase();
  }

  onRemoveClick = id => {
    this.setState({
      current: id
    });
    this.removeToggle();
  };

  onModifyClick = id => {
    this.setState({ current: id });
    this.modifyToggle();
  };

  removeCategory = () => {
    this.props.deleteCategory(this.state.removeId);
  };

  modifyToggle = cat => {
    this.setState({ modify: !this.state.modify });
  };

  createToggle = () => {
    this.setState({ create: !this.state.create });
  };

  removeToggle = () => {
    this.setState({ remove: !this.state.remove });
  };

  render() {
    const { remove, modify, current } = this.state;
    const { classes, database, subpage } = this.props;

    return (
      <div className={classes.root}>
        {subpage === 0 ? (
          <GridList cellHeight={200} className={classes.gridList} cols={3}>
            {database.map(item => (
              <GridListTile key={item._id}>
                <img src={item.snap} alt={item.title} />
                <GridListTileBar
                  title={item.name}
                  actionIcon={
                    <div>
                      <IconButton
                        className={classes.icon}
                        onClick={this.onModifyClick.bind(this, item._id)}
                      >
                        <Create />
                      </IconButton>
                      <IconButton
                        className={classes.icon}
                        onClick={this.onRemoveClick.bind(this, item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  }
                />
              </GridListTile>
            ))}
            <Modify open={modify} toggle={this.modifyToggle} id={current} />
            <Remove open={remove} toggle={this.removeToggle} id={current} />
          </GridList>
        ) : (
          <Add />
        )}
      </div>
    );
  }
}

Database.propTypes = {
  classes: PropTypes.object.isRequired,
  getDatabase: PropTypes.func.isRequired,
  database: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  database: state.database.database
});

export default connect(
  mapStateToProps,
  { getDatabase }
)(withStyles(styles)(Database));
