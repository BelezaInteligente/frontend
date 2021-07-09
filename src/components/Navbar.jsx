import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { accountService } from '../services';
import { Role } from '../helpers';

//const logo = require('../images/logo.svg');

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['A100']}`,
    borderTop: `1px solid ${theme.palette.grey['A100']}`,
    backgroundColor: 'white',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    display: 'inline',
    borderRight: `1px solid ${theme.palette.grey['A100']}`,
    paddingLeft: 24,
    paddingRight: 24,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  navOptions: {
    textDecoration: 'none',
    color: 'inherit',
    paddingTop: 10,
    paddingBottom: 10,
    minWidth: 'auto',
  },
  navButton: {
    marginLeft: theme.spacing(2),
  },
}));

function Navbar() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState({});

  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  // const [showUserBoard, setShowUserBoard] = useState(false);

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setCurrentUser(x));

    // if (currentUser) {
    //   console.log('User: ' + currentUser.role);
    //   setShowUserBoard(currentUser.role === Role.User ? true : false);
    //   setShowAdminBoard(currentUser.role === Role.Admin ? true : false);
    // };

    return subscription.unsubscribe;
  }, []);

  // if (!currentUser) {
  //   return null;
  // };

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar variant="dense" className={classes.toolbar} disableGutters={true}>
          <div className={classes.logo}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <NavLink excat to="/" className={classes.link}>
                {/* <img width={20} src={logo} alt="" /> */}
                Beleza Inteligente
              </NavLink>
            </Typography>
          </div>

          <NavLink to="/" className={classes.navOptions}>
            <Button>Home</Button>
          </NavLink>

          {currentUser && (
            <NavLink to="/dashboard" className={classes.navOptions}>
              <Button>Dashboard</Button>
            </NavLink>
          )}

          {localStorage.getItem("userRole") === Role.User && (
            <NavLink to="/goal" className={classes.navOptions}>
              <Button>Metas</Button>
            </NavLink>
          )}

          {currentUser && (
            <NavLink to="/profile" className={classes.navOptions}>
              <Button>Perfil</Button>
            </NavLink>
          )}

          {localStorage.getItem("userRole") === Role.Admin && (
            <NavLink to="/admin" className={classes.navOptions}>
              <Button>Admin</Button>
            </NavLink>
          )}

          {currentUser ? (
            <Button onClick={accountService.logout} className={classes.navOptions}>
              Sair
            </Button>
          ) : (
              <NavLink to="/account/login" className={classes.navOptions}>
                <Button>Login</Button>
              </NavLink>
            )}

          <Route path="/admin" component={AdminNavBar} />

        </Toolbar>
      </AppBar>
    </div>
  );
}

function AdminNavBar({ match }) {
  const { path } = match;
  const classes = useStyles();

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar className={classes.toolbar} disableGutters={true}>
        <NavLink to={`${path}/users`} className={classes.link}>
          <Button>Usuários</Button>
        </NavLink>
        <NavLink to={`${path}/groups`} className={classes.link}>
          <Button>Grupos</Button>
        </NavLink>
        <NavLink to={`${path}/goals`} className={classes.link}>
          <Button>Metas</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}

export { Navbar };
