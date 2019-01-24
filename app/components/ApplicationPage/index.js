// @flow

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as paths from 'config/routes';

import HomePage from './HomePage';
import AuthPage from './AuthPage';
import TopicPage from './TopicPage';
import PullRequestPage from './PullRequestPage';
import UserPage from './UserPage';
import DevPage from './DevPage';
import NotFoundPage from './NotFoundPage';

type Props = {| |};

const PureApplicationPage = (props: Props): React.Node => {
  return (
    <Switch>
      <Route path={paths.HOME_ROUTE} exact={true} component={HomePage} />
      <Route path={paths.AUTH_ROUTE} component={AuthPage} />
      <Route path={paths.TOPIC_ROUTE} component={TopicPage} />
      <Route path={paths.PULL_REQUEST_ROUTE} component={PullRequestPage} />
      <Route path={paths.USER_ROUTE} component={UserPage} />
      <Route path={paths.DEV_ROUTE} component={DevPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const ApplicationPage = PureApplicationPage;

export { PureApplicationPage };
export default ApplicationPage;
