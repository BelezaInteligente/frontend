import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { history } from './helpers';
import { App } from './app/Index';
import theme from './helpers/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <CssBaseline />
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);
