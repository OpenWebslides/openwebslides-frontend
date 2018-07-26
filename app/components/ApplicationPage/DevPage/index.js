// @flow

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as paths from 'config/routes';

import NotFoundPage from '../NotFoundPage';

import GenerateRandomStringPage from './GenerateRandomStringPage';

type Props = {| |};

const PureDevPage = (props: Props): React.Node => {
  return (
    <Switch>
      <Route path={paths.DEV_GENERATE_RANDOM_STRING_ROUTE} component={GenerateRandomStringPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const DevPage = PureDevPage;

export { PureDevPage };
export default DevPage;
