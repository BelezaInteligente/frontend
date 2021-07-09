import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DetailDashboard } from './DetailDashboard';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

function Dashboard({ match }) {
  const { path } = match;
  const classes = useStyles();

  return (
    <Grid>
      <Grid item>
        <Paper className={classes.paper}>
          <Switch>
            <Route path={path} component={DetailDashboard} />
          </Switch>
        </Paper>
      </Grid>
    </Grid>
  );
}

export { Dashboard };
