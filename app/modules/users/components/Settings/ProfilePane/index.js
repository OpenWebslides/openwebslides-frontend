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
  const { t, i18n, user } = props;

  return (
    <Tab.Pane className="settings">
      <Grid columns={1} padded="vertically">
        <Grid.Row>
          <Grid.Column width={5}>
            {/* TODO: retrieve available locales from somewhere */}
            <ProfileForm
              user={user}
              // eslint-disable-next-line flowtype/no-weak-types
              availableLocales={i18n.languages.map((language: string): any => {
                return { key: language, value: language, text: t(`settings:locales.${language}`) };
              })}
            >
              <Button type="submit" primary={true}>
                {t('settings:profile.updateProfile')}
              </Button>
            </ProfileForm>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
};

const ProfilePane = withNamespaces()(PureProfilePane);

export { PureProfilePane };
export default ProfilePane;
