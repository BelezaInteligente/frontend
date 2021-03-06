import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ListGoal } from './ListGoal';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

function Goal({ match }) {
  const { path } = match;
  const classes = useStyles();

  return (
    <Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={classes.paper}>
          <Switch>
            <Route path={path} component={ListGoal} />
          </Switch>
        </Paper>
      </Grid>
    </Grid>
  );
}

export { Goal };
