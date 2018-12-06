// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Tab, Button, Grid } from 'semantic-ui-react';

import ProfileForm from 'forms/ProfileForm';
import users from 'modules/users';

type PassedProps = {|
  user: users.model.User,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureProfilePane = (props: Props): React.Node => {
  const { t, user } = props;

  return (
    <Tab.Pane className="settings">
      <Grid padded="vertically">
        <Grid.Row width={4}>
          <ProfileForm user={user}>
            <Button type="submit" primary={true}>
              {t('settings:buttons.profile')}
            </Button>
          </ProfileForm>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
};

const ProfilePane = withNamespaces()(PureProfilePane);

export { PureProfilePane };
export default ProfilePane;
