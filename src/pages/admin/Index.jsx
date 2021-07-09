import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { HomeAdmin } from './HomeAdmin';
import { ListUser } from './ListUser';
import { ListGroup } from './ListGroup';
import { ListUserGoal } from './ListUserGoal';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

function Admin({ match }) {
  const { path } = match;
  const classes = useStyles();

  return (
    <Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={classes.paper}>
          <Switch>
            <Route exact path={path} component={HomeAdmin} />
            <Route path={`${path}/users`} component={ListUser} />
            <Route path={`${path}/groups`} component={ListGroup} />
            <Route path={`${path}/goals`} component={ListUserGoal} />
          </Switch>
        </Paper>
      </Grid>
    </Grid>
  );
}

export { Admin };
