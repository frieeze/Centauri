import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { getStats, resetStats } from '../../actions/statsActions';

import Week from './Week';
import Month from './Month';
import Custom from './Custom';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 400
  }
});

export class Stats extends Component {
  componentWillMount() {
    this.props.resetStats();
  }
  render() {
    const { subpage } = this.props;
    return (
      <div className={this.props.classes.root}>
        {(function() {
          switch (subpage) {
            case 0:
              return <Week />;
            case 1:
              return <Month />;
            case 2:
              return <Custom />;
            default:
              return <Week />;
          }
        })()}
      </div>
    );
  }
}

Stats.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  stats: state.stats.stats
});

export default connect(
  mapStateToProps,
  { getStats, resetStats }
)(withStyles(styles)(Stats));
