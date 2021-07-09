import React from 'react';

import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: 5,
    textAlign: "center",
    left: 0,
    bottom: 0,
    right: 0,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary">
          Copyright ©
          BelezaInteligente - contato@belezainteligente.app
          {' '}
          {new Date().getFullYear()}.
        </Typography>
      </Container>
    </footer>
  );
}

export { Footer };
