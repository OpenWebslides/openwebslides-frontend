// @flow

import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import users from 'modules/users';

import Page from '../Page';

type Props = TranslatorProps;

const { ProfileCard } = users.components;


const PureProfilePage = (props: Props): React.Node => {
  const {
    t,
  } = props;

  return (
    <Page>
      <Grid.Row>
        <Grid padded="vertically">
          <Grid.Column>
            <h1>{t('pages:profile.title')}</h1>
            <ProfileCard userId="markfrank1" />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    </Page>
  );
};

const ProfilePage = translate()(PureProfilePage);

export { PureProfilePage };
export default ProfilePage;
