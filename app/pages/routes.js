// @flow
/**
 * Defines routes for the various pages of the app.
 * Note: pages & other components can define their own sub-routes, which are not included here.
 *
 * Docs: https://reacttraining.com/react-router/web/guides/basic-components
 */

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from './components/NotFoundPage';
import HomePage from './components/HomePage';
import TopicsPage from './components/TopicsPage';

const routes = (
  <Switch>
    <Route path="/" exact={true} component={HomePage} />
    <Route path="/topics" component={TopicsPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default routes;
