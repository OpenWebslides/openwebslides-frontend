// @flow

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as paths from 'config/routes';

import NotFoundPage from '../NotFoundPage';

import ViewPage from './ViewPage';
import ReviewPage from './ReviewPage';

const PurePullRequestPage = (): React.Node => {
  return (
    <Switch>
      <Route path={paths.PULL_REQUEST_VIEW_ROUTE} component={ViewPage} />
      <Route path={paths.PULL_REQUEST_REVIEW_ROUTE} component={ReviewPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const PullRequestPage = PurePullRequestPage;

export { PurePullRequestPage };
export default PullRequestPage;
