import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';

import { Login } from './Login';
import { ForgotPassword } from './ForgotPassword';
import { accountService } from '../../services';

function Account({ history, match }) {
  const { path } = match;

  useEffect(() => {
    if (accountService.userValue) {
      history.push('/');
    }
  }, [history]);

  return (
    <>
      <Container maxWidth="sm">
        <Switch>
          <Route path={`${path}/login`} component={Login} />
          <Route path={`${path}/forgotpassword`} component={ForgotPassword} />
        </Switch>
      </Container>
    </>
  );
}

export { Account };
