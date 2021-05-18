import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";

import Paper from "@material-ui/core/Paper";

import { connect } from "react-redux";
import { getStats, resetStats } from "../../actions/statsActions";

const data = (stats) => {
  return {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
      {
        label: "Visiteurs uniques",
        borderColor: "#f96332",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#f96332",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: stats.unique,
      },
      {
        label: "Pages visitées",
        borderColor: "#14ad2b",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#14ad2b",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: stats.total,
      },
      {
        label: "Devis demandés",
        borderColor: "#085add",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#085add",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: stats.mail,
      },
    ],
  };
};

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    bodySpacing: 4,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10,
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        ticks: {
          display: true,
          padding: 15,
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        display: 1,
        ticks: {
          display: true,
          padding: 15,
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  layout: {
    padding: { left: 10, right: 10, top: 15, bottom: 15 },
  },
};

const styles = (theme) => ({
  root: {
    display: "flex",
    width: "100%",
    minWidth: 400,
    marginBottom: 50,
  },
  paper: {
    height: 500,
    width: 850,
    margin: "auto",
    overflow: "hidden",
  },
  formControl: {
    width: 150,
    marginLeft: 30,
  },
});

export class Week extends Component {
  componentDidMount() {
    this.props.resetStats();
    this.props.getStats("week");
  }
  parseStats = () => {
    const { stats } = this.props;

    return {
      total: Array.from(
        {
          length: 7,
        },
        (_, k) =>
          stats.find((day) => day.day.week - 1 === k)
            ? stats.find((day) => day.day.week - 1 === k).total
            : undefined
      ),
      unique: Array.from(
        {
          length: 7,
        },
        (_, k) =>
          stats.find((day) => day.day.week - 1 === k)
            ? stats.find((day) => day.day.week - 1 === k).unique
            : undefined
      ),
      mail: Array.from(
        {
          length: 7,
        },
        (_, k) =>
          stats.find((day) => day.day.week - 1 === k)
            ? stats.find((day) => day.day.week - 1 === k).mail
            : undefined
      ),
    };
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Line data={data(this.parseStats())} options={options} />
        </Paper>
      </div>
    );
  }
}

Week.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stats: state.stats.stats,
});

export default connect(
  mapStateToProps,
  { getStats, resetStats }
)(withStyles(styles)(Week));
