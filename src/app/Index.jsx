import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Navbar, Footer, PrivateRoute } from '../components';
import { Home } from '../pages/home/Index';
import { Account } from '../pages/account/Index';
// import { Goal } from '../pages/goal/Index';
// import { Profile } from '../pages/profile/Index';
// import { Admin } from '../pages/admin/Index';

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <PrivateRoute exact path="/" component={Home} />
        {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        {/* <PrivateRoute path="/goal" component={Goal} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute paht="/admin" component={Admin} /> */}
        <Route path="/account" component={Account} />
        <Redirect from="*" to="/" />
      </Switch>

      <Footer />
    </div>
  );
}

export { App };
