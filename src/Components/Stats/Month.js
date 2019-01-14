import React, { Component } from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';

import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { getStats, resetStats } from '../../actions/statsActions';

const nbJours = (year, month) => {
  var nbreJour = 0;

  if (month <= 6) {
    if (month % 2 == 0) {
      nbreJour = 31;
    } else {
      nbreJour = 30;
    }
  } else {
    if (month % 2 == 1) {
      nbreJour = 30;
    } else {
      nbreJour = 31;
    }
  }
  if (month == 1) {
    if (year % 4 == 0) {
      if (year % 100 == 0) {
        if (year % 400 == 0) {
          nbreJour = 29;
        } else {
          nbreJour = 28;
        }
      } else {
        nbreJour = 29;
      }
    } else {
      nbreJour = 28;
    }
  }

  return nbreJour;
};

const data = stats => {
  return {
    labels: Array.from(
      { length: nbJours(new Date().getFullYear(), new Date().getMonth()) },
      (v, k) => k + 1
    ),
    datasets: [
      {
        label: 'Visiteurs uniques',
        borderColor: '#f96332',
        pointBorderColor: '#FFF',
        pointBackgroundColor: '#f96332',
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: stats.unique
      },
      {
        label: 'Pages visitées',
        borderColor: '#14ad2b',
        pointBorderColor: '#FFF',
        pointBackgroundColor: '#14ad2b',
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: stats.total
      }
    ]
  };
};

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    bodySpacing: 4,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest',
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        ticks: {
          display: true,
          padding: 15
        },
        gridLines: {
          zeroLineColor: 'transparent',
          drawTicks: false,
          display: false,
          drawBorder: false
        }
      }
    ],
    xAxes: [
      {
        display: 1,
        ticks: {
          display: true,
          padding: 15
        },
        gridLines: {
          zeroLineColor: 'transparent',
          drawTicks: false,
          display: false,
          drawBorder: false
        }
      }
    ]
  },
  layout: {
    padding: { left: 10, right: 10, top: 15, bottom: 15 }
  }
};

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    minWidth: 400,
    marginBottom: 50
  },
  paper: {
    height: 500,
    width: 850,
    margin: 'auto',
    overflow: 'hidden'
  },
  formControl: {
    width: 150,
    marginLeft: 30
  }
});

export class Month extends Component {
  componentDidMount() {
    this.props.getStats('month');
  }

  getStats = () => {
    const { stats } = this.props;

    return {
      total: Array.from(
        {
          length: nbJours(new Date().getFullYear(), new Date().getMonth())
        },
        (v, k) =>
          stats.find(day => day.day.month === k)
            ? stats.find(day => day.day.month === k).total
            : undefined
      ),
      unique: Array.from(
        {
          length: nbJours(new Date().getFullYear(), new Date().getMonth())
        },
        (v, k) =>
          stats.find(day => day.day.month === k)
            ? stats.find(day => day.day.month === k).unique
            : undefined
      )
    };
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Line data={data(this.getStats())} options={options} />
        </Paper>
      </div>
    );
  }
}

Month.propTypes = {
  classes: PropTypes.object.isRequired,
  stats: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  stats: state.stats.stats
});

export default connect(
  mapStateToProps,
  { getStats, resetStats }
)(withStyles(styles)(Month));
