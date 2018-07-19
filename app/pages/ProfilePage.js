// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, type ContextRouter as RouterProps } from 'react-router-dom';
import { translate, type TranslatorProps } from 'react-i18next';

import Page from 'core-components/Page';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
// import type { User } from 'modules/users';
import users from 'modules/users';
import authentication from 'modules/authentication';

const { ProfileCard } = users.components;
const { getAccount } = authentication.selectors;

type PassedProps = {|
  userId: Identifier,
|};

type StateProps = {|
  // #TODO replace with userId to remove depentency on modules/users
  // eslint-disable-next-line flowtype/no-weak-types
  +account: any,
|};

type Props = {|
  ...TranslatorProps,
  ...RouterProps,
  ...PassedProps,
  ...StateProps,
|};

const mapStateToProps = (state: State): StateProps => {
  const account = getAccount(state);

  // TODO: figure out what to do with /users if no user is logged in
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

const UserProfile = (props: Props): React.Node => {
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
    // $FlowFixMe Can't figure out cause; Page component needs rewriting anyway #TODO
    <Page>
      <React.Fragment>
        <h1>{t('global:title.profile')}</h1>
        <Switch>
          <Route path={`${match.url}/:id`} component={UserProfile} />
          { /* #TODO */ }
          { /* eslint-disable-next-line react/jsx-no-bind */ }
          <Route render={() => <CurrentUserProfile userId={CURRENT_USER} />} />
        </Switch>
      </React.Fragment>
    </Page>
  );
};

const ProfilePage = connect(mapStateToProps)(translate()(PureProfilePage));

export { PureProfilePage };
export default ProfilePage;
