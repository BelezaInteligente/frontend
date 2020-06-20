import React, { useState, useEffect } from 'react';

import { Typography, makeStyles } from '@material-ui/core';

import { accountService } from '../../services';

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'relative',
  },
}));

function Profile({ match }) {
  const { path } = match;
  const classes = useStyles();
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  return (
    <div className={classes.header}>
      <Typography>Email: {`${user}`}!</Typography>
    </div>
  );
}

export { Profile };
