import React from 'react';

import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'relative',
  },
}));

function Admin({ match }) {
  const { path } = match;
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Typography>Admin</Typography>
    </div>
  );
}

export { Admin };
