import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Navbar, Footer, PrivateRoute } from '../components';
import { Home } from '../pages/home/Index';
import { Dashboard } from '../pages/dashboard/Index';
import { Account } from '../pages/account/Index';
import { Profile } from '../pages/profile/Index';
import { Goal } from '../pages/goal/Index';
import { Admin } from '../pages/admin/Index';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <div className="App">
      <div className={classes.root}>
        <Navbar />
        <main className={classes.content}>
          <Container maxWidth='xl' className={classes.container}>
            <Switch>
              <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/goal" component={Goal} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/admin" component={Admin} />
              <Route path="/account" component={Account} />
              <Redirect from="*" to="/" />
            </Switch>
          </Container>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export { App };
