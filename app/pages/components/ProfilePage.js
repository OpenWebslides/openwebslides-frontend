// @flow

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import users from 'modules/users';

import Page from '../Page';

type RouteProps = {
  match: Match,
};

type Props = TranslatorProps & RouteProps;

const { ProfileCard } = users.components;

const CurrentUserProfile = (): React.Node => {
  return (
    <React.Fragment>
      <ProfileCard userId="markfrank1" />
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
      <Grid.Row>
        <Grid padded="vertically">
          <Grid.Column>
            <h1>{t('pages:profile.title')}</h1>
            <Switch>
              <Route path={`${match.url}/:id`} component={UserProfile} t={t} />
              <Route component={CurrentUserProfile} t={t} />
            </Switch>
          </Grid.Column>
        </Grid>
      </Grid.Row>
    </Page>
  );
};

const ProfilePage = translate()(PureProfilePage);

export { PureProfilePage };
export default ProfilePage;
