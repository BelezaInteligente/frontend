import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

import { history } from './helpers';
import { App } from './app/Index';

ReactDOM.render(
  <Router history={history}>
    <CssBaseline />
    <App />
  </Router>,
  document.getElementById('root')
);
