import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { connect } from 'react-redux';
import { getHomeStats, resetStats } from '../../actions/statsActions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    minWidth: 400
  },
  card: {
    margin: 15,
    maxWidth: 300
  },
  names: {},
  values: {}
});

export class Home extends Component {
  componentDidMount() {
    this.props.getHomeStats();
  }
  render() {
    const { classes, stats } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom color="textSecondary" variant="h5">
              Aujourd'hui
            </Typography>
            <List>
              <ListItem>
                <ListItemText>Visiteurs uniques :</ListItemText>
                <ListItemSecondaryAction>
                  {stats.unique}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Pages chargées :</ListItemText>
                <ListItemSecondaryAction>{stats.total}</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Devis demandés :</ListItemText>
                <ListItemSecondaryAction>{stats.mail}</ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>
        {stats.week && (
          <Card className={classes.card}>
            <CardContent>
              <Typography gutterBottom color="textSecondary" variant="h5">
                Cette semaine
              </Typography>
              <List>
                <ListItem>
                  <ListItemText>Visiteurs uniques :</ListItemText>
                  <ListItemSecondaryAction>
                    {stats.week.unique}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText>Pages chargées :</ListItemText>
                  <ListItemSecondaryAction>
                    {stats.week.total}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText>Devis demandés :</ListItemText>
                  <ListItemSecondaryAction>
                    {stats.week.mail}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}
        {stats.month && (
          <Card className={classes.card}>
            <CardContent>
              <Typography gutterBottom color="textSecondary" variant="h5">
                Ce mois ci
              </Typography>
              <List>
                <ListItem>
                  <ListItemText>Visiteurs uniques :</ListItemText>
                  <ListItemSecondaryAction>
                    {stats.month.unique}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText>Pages chargées :</ListItemText>
                  <ListItemSecondaryAction>
                    {stats.month.total}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText>Devis demandés :</ListItemText>
                  <ListItemSecondaryAction>
                    {stats.month.mail}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  stats: state.stats.home
});

export default connect(
  mapStateToProps,
  { getHomeStats, resetStats }
)(withStyles(styles)(Home));
