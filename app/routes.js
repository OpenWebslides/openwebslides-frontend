// @flow
/**
 * Defines routes for the various pages of the app.
 * Note: pages & other components can define their own sub-routes, which are not included here.
 *
 * Docs: https://reacttraining.com/react-router/web/guides/basic-components
 */

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import history from 'modules/history';
import NotFoundPage from 'pages/NotFoundPage';
import HomePage from 'pages/HomePage';
import LibraryPage from 'pages/LibraryPage';
import EditorPage from 'pages/EditorPage';
import NewTopicPage from 'pages/NewTopicPage';
import ProfilePage from 'pages/ProfilePage';
import TempSlideTestPage from 'pages/TempSlideTestPage';
import GenerateRandomStringPage from 'pages/GenerateRandomStringPage';
import SigninPage from 'pages/authentication/SigninPage';
import SignupPage from 'pages/authentication/SignupPage';
import ResetPage from 'pages/authentication/ResetPage';
import ConfirmPage from 'pages/authentication/ConfirmPage';

const History = history.components.History;

const routes = (
  <React.Fragment>
    <History />
    <Switch>
      <Route path="/" exact={true} component={HomePage} />
      <Route path="/library" component={LibraryPage} />
      <Route path="/editor" component={EditorPage} />
      <Route path="/topics/new" component={NewTopicPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/tempslidetest" component={TempSlideTestPage} />
      <Route path="/generaterandomstring/:length?" component={GenerateRandomStringPage} />
      <Route path="/auth/signin" exact={true} component={SigninPage} />
      <Route path="/auth/signup" exact={true} component={SignupPage} />
      <Route path="/auth/reset" exact={true} component={ResetPage} />
      <Route path="/auth/confirm" exact={true} component={ConfirmPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </React.Fragment>
);

export default routes;
