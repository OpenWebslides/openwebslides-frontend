// @flow

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as paths from 'config/routes';
import platform from 'modules/platform';

import NotFoundPage from '../NotFoundPage';

import ProfilePage from './ProfilePage';
import SignoutPage from './SignoutPage';

const { AuthWrapper } = platform.components;

type Props = {| |};

const PureUserPage = (props: Props): React.Node => {
  return (
    <AuthWrapper>
      <Switch>
        <Route path={paths.USER_PROFILE_ROUTE} component={ProfilePage} />
        <Route path={paths.USER_SIGNOUT_ROUTE} component={SignoutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </AuthWrapper>
  );
};

const UserPage = PureUserPage;

export { PureUserPage };
export default UserPage;
