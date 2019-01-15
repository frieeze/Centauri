import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { Line } from 'react-chartjs-2';

import { connect } from 'react-redux';
import { getStats, resetStats } from '../../actions/statsActions';

const years = Array.from(
  { length: new Date().getFullYear() - 2018 },
  (v, k) => k + 2019
);
const months = [
  { num: '01', name: 'Janvier' },
  { num: '02', name: 'Fevrier' },
  { num: '03', name: 'Mars' },
  { num: '04', name: 'Avril' },
  { num: '05', name: 'Mai' },
  { num: '06', name: 'Juin' },
  { num: '07', name: 'Juillet' },
  { num: '08', name: 'Aout' },
  { num: '09', name: 'Septembre' },
  { num: '10', name: 'Octobre' },
  { num: '11', name: 'Novembre' },
  { num: '12', name: 'Décembre' }
];

const data = stats => {
  return {
    labels: stats.labels,
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
      },
      {
        label: 'Devis demandés',
        borderColor: '#085add',
        pointBorderColor: '#FFF',
        pointBackgroundColor: '#085add',
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: stats.mail
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
    minWidth: 300
  },
  form: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row'
  },
  paper: {
    width: '100%',
    margin: 'auto',
    overflow: 'hidden'
  },
  formControl: {
    width: 125,
    margin: 15,
    marginLeft: 25
  },
  formLabel: {
    margin: '1.5em 1.5em 0em 1em'
  },
  button: {
    width: 100,
    marginLeft: 25,
    marginTop: 70
  },
  snackbar: {
    backgroundColor: '#d32f2f'
  },
  graph: {
    height: 500
  }
});
export class Custom extends Component {
  state = {
    begYear: '',
    begMonth: '',
    endYear: '',
    endMonth: '',
    scale: '',
    snackbar: false
  };

  componentDidMount() {
    this.props.resetStats();
  }

  handleSnackbar = () => this.setState({ snackbar: false });

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const { scale, begYear, begMonth, endYear, endMonth } = this.state;
    if (begYear && begMonth && endYear && endMonth && scale) {
      this.props.getStats(
        scale,
        parseInt(begYear + begMonth),
        parseInt(endYear + endMonth)
      );
    } else {
      this.setState({ snackbar: true });
    }
  };

  parseStats = () => {
    const { stats } = this.props;

    return {
      total: stats.map(x => x.total),
      unique: stats.map(x => x.unique),
      mail: stats.map(x => x.mail),
      labels: stats.map(x => {
        switch (this.props.scale) {
          case 'day':
            return `${x.day.month}/${x.month.month}/${x.year}`;
          case 'week':
            return `${x.week}/${x.year}`;
          case 'month':
            return `${x.month}/${x.year}`;
          default:
            return x.code;
        }
      })
    };
  };

  render() {
    const { classes } = this.props;
    const {
      begYear,
      begMonth,
      endYear,
      endMonth,
      snackbar,
      scale
    } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.form}>
            <div>
              <FormLabel component="legend" className={classes.formLabel}>
                Début
              </FormLabel>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="begin-year-select">Année</InputLabel>
                <Select
                  value={begYear}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'begYear',
                    id: 'begin-year-select'
                  }}
                >
                  {years.map(y => (
                    <MenuItem value={y}>{y}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="begin-month-select">Mois</InputLabel>
                <Select
                  value={begMonth}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'begMonth',
                    id: 'begin-month-select'
                  }}
                >
                  {months.map(y => (
                    <MenuItem value={y.num}>{y.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormLabel component="legend" className={classes.formLabel}>
                Fin
              </FormLabel>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="end-year-select">Année</InputLabel>
                <Select
                  value={endYear}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'endYear',
                    id: 'end-year-select'
                  }}
                >
                  {years.map(y =>
                    begYear ? (
                      y >= begYear && <MenuItem value={y}>{y}</MenuItem>
                    ) : (
                      <MenuItem value={y}>{y}</MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="end-month-select">Mois</InputLabel>
                <Select
                  value={endMonth}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'endMonth',
                    id: 'end-month-select'
                  }}
                >
                  {months.map(y =>
                    begYear && begMonth && endYear && begYear === endYear ? (
                      y.num >= begMonth && (
                        <MenuItem value={y.num}>{y.name}</MenuItem>
                      )
                    ) : (
                      <MenuItem value={y.num}>{y.name}</MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormLabel component="legend" className={classes.formLabel}>
                Trier par :
              </FormLabel>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="scale-select">Echelle</InputLabel>
                <Select
                  value={scale}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'scale',
                    id: 'scale-select'
                  }}
                >
                  <MenuItem value="day">Jours</MenuItem>
                  <MenuItem value="week">Semaines</MenuItem>
                  <MenuItem value="month">Mois</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={this.handleSubmit}
              >
                Valider
              </Button>
            </div>
          </div>
          <div className={classes.graph}>
            <Line data={data(this.parseStats())} options={options} />
          </div>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          open={snackbar}
          onClose={this.handleSnackbar}
          autoHideDuration={6000}
        >
          <SnackbarContent
            message={
              <span id="client-snackbar">
                Tous les champs n'ont pas été renseignés
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

Custom.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  stats: state.stats.stats,
  scale: state.stats.scale
});

export default connect(
  mapStateToProps,
  { getStats, resetStats }
)(withStyles(styles)(Custom));
