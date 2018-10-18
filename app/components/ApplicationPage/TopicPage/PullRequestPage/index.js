// @flow

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as paths from 'config/routes';

import NewPullRequestPage from './NewPullRequestPage';

type Props = {| |};

const PurePullRequestPage = (props: Props): React.Node => {
  return (
    <Switch>
      <Route path={paths.TOPIC_PR_NEW_ROUTE} component={NewPullRequestPage} />
    </Switch>
  );
};

const PullRequestPage = PurePullRequestPage;

export { PurePullRequestPage };
export default PullRequestPage;
