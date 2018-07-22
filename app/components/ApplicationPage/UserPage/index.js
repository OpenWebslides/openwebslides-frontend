// @flow
/* eslint-disable max-len */

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as paths from 'config/routes';
import platform from 'modules/platform';

import NotFoundPage from '../NotFoundPage';

import LibraryPage from './LibraryPage';
import ProfilePage from './ProfilePage';

const { AuthWrapper } = platform.components;

type Props = {| |};

const PureUserPage = (props: Props): React.Node => {
  return (
    <AuthWrapper>
      <Switch>
        <Route path={paths.USER_LIBRARY_ROUTE} component={LibraryPage} />
        <Route path={paths.USER_PROFILE_ROUTE} component={ProfilePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </AuthWrapper>
  );
};

const UserPage = PureUserPage;

export { PureUserPage };
export default UserPage;
