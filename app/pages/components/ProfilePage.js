// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { translate } from 'react-i18next';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import type { CustomTranslatorProps } from 'types/translator';

import type { User } from 'modules/users';

import users from 'modules/users';
import authentication from 'modules/authentication';

import Page from '../Page';

const { ProfileCard } = users.components;
const { getAccount } = authentication.selectors;

type RouteProps = {
  match: Match,
};

type StateProps = {
  account: ?User,
};

type PassedProps = {
  userId: Identifier,
};

type Props = CustomTranslatorProps & RouteProps & StateProps;

const mapStateToProps = (state: State): StateProps => {
  const account = getAccount(state);

  // TODO: figure out what to do with /profile if no user is logged in
  /*
  if (account == null) {
    throw new Error(`User is not logged in`);
  }
  */

  return {
    account,
  };
};

const CurrentUserProfile = (props: PassedProps): React.Node => {
  const { userId } = props;

  return (
    <React.Fragment>
      <ProfileCard userId={userId} />
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
    account,
  } = props;

  const CURRENT_USER = account != null ? account.id : 'jantje1234';

  return (
    <Page>
      <h1>{t('pages:profile.title')}</h1>
      <Switch>
        <Route path={`${match.url}/:id`} component={UserProfile} />
        <Route render={() => <CurrentUserProfile userId={CURRENT_USER} />} />
      </Switch>
    </Page>
  );
};

const ProfilePage = connect(mapStateToProps)(translate()(PureProfilePage));

export { PureProfilePage };
export default ProfilePage;
