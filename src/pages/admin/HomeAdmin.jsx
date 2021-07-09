import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

function HomeAdmin({ match }) {
  const { path } = match;
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" align="left" color="textPrimary" component="p">
        Bem vindo, Administrador
      </Typography>
      <Grid>
        <Grid item>
          <Typography variant="h5" align="left" color="textSecondary" component="p">
            <Link to={`${path}/users`} className={classes.link}>
              {' '}
              - Cadastro de Usuários
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" align="left" color="textSecondary" component="p">
            <Link to={`${path}/groups`} className={classes.link}>
              {' '}
              - Cadastro de Grupos
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" align="left" color="textSecondary" component="p">
            <Link to={`${path}/goals`} className={classes.link}>
              {' '}
              - Cadastro de Metas de Usuários
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export { HomeAdmin };
