// @flow

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as paths from 'config/routes';

import NotFoundPage from '../NotFoundPage';

import ViewerPage from './ViewerPage';
import EditorPage from './EditorPage';
import NewTopicPage from './NewTopicPage';

type Props = {| |};

const PureTopicPage = (props: Props): React.Node => {
  return (
    <Switch>
      <Route path={paths.TOPIC_VIEWER_ROUTE} component={ViewerPage} />
      <Route path={paths.TOPIC_EDITOR_ROUTE} component={EditorPage} />
      <Route path={paths.TOPIC_NEW_ROUTE} component={NewTopicPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const TopicPage = PureTopicPage;

export { PureTopicPage };
export default TopicPage;
