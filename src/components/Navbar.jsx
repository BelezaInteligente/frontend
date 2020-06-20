import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';

import { accountService } from '../services';

const logo = require('../images/logo.svg');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',
  },
  logo: {
    display: 'inline',
    borderRight: `1px solid ${theme.palette.grey['A100']}`,
    marginRight: 32,
    paddingRight: 24,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  navOptions: {
    //position: 'relative',
    textDecoration: 'none',
    //color: "inherit",

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
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  if (!user) return null;

  return (
    <div className={classes.root}>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <div className={classes.logo}>
            <Typography variant="h6" color="inherit" noWrap>
              <NavLink excat to="/" className={classes.link}>
                <img width={20} src={logo} alt="" />
                Beleza Inteligente
              </NavLink>
            </Typography>
          </div>

          <NavLink exact to="/" className={classes.navOptions}>
            <Button>Home</Button>
          </NavLink>
          <a
            href="/https://powerbi.microsoft.com/pt-br/"
            target="_blank"
            className={classes.navOptions}
          >
            <Button>Dashboard</Button>
          </a>
          <NavLink to="/goal" className={classes.navOptions}>
            <Button>Metas</Button>
          </NavLink>
          <NavLink to="/profile" className={classes.navOptions}>
            <Button>Perfil</Button>
          </NavLink>
          <NavLink to="/admin" className={classes.navOptions}>
            <Button>Admin</Button>
          </NavLink>
          <Button onClick={accountService.logout} className={classes.navOptions}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export { Navbar };
