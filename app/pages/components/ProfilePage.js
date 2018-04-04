// @flow

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { translate } from 'react-i18next';

import type { CustomTranslatorProps } from 'types/translator';

import users from 'modules/users';

import Page from '../Page';

const { CURRENT_USER } = users.constants;
const { ProfileCard } = users.components;

type RouteProps = {
  match: Match,
};

type Props = CustomTranslatorProps & RouteProps;

const CurrentUserProfile = (): React.Node => {
  return (
    <React.Fragment>
      <ProfileCard userId={CURRENT_USER} />
    </React.Fragment>
  );
};

const UserProfile = (props: RouteProps): React.Node => {
  const { match } = props;
  const userId = match.params.id || '';

  return (
    <React.Fragment>
      <ProfileCard userId={userId} />
    </React.Fragment>
  );
};


const PureProfilePage = (props: Props): React.Node => {
  const {
    t,
    match,
  } = props;

  return (
    <Page>
      <h1>{t('pages:profile.title')}</h1>
      <Switch>
        <Route path={`${match.url}/:id`} component={UserProfile} t={t} />
        <Route component={CurrentUserProfile} t={t} />
      </Switch>
    </Page>
  );
};

const ProfilePage = translate()(PureProfilePage);

export { PureProfilePage };
export default ProfilePage;
