// @flow
/* eslint-disable max-len */

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as paths from 'config/routes';

import LibraryHomePage from './LibraryHomePage';
import NewTopicPage from './NewTopicPage';

type Props = {| |};

const PureLibraryPage = (props: Props): React.Node => {
  return (
    <Switch>
      <Route path={paths.USER_LIBRARY_NEW_TOPIC_ROUTE} component={NewTopicPage} />
      <Route path={paths.USER_LIBRARY_ROUTE} component={LibraryHomePage} />
    </Switch>
  );
};

const LibraryPage = PureLibraryPage;

export { PureLibraryPage };
export default LibraryPage;
