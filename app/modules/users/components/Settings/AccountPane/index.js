// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Tab, Button, Grid, Header } from 'semantic-ui-react';

import AccountForm from 'forms/AccountForm';
import PasswordForm from 'forms/PasswordForm';
import users from 'modules/users';

type PassedProps = {|
  user: users.model.User,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureAccountPane = (props: Props): React.Node => {
  const { t, i18n, user } = props;

  return (
    <Tab.Pane className="settings">
      <Grid columns={3} padded="vertically">
        <Grid.Row>
          <Grid.Column width={5}>
            <Header as="h4">{t('settings:headers.password')}</Header>
            <PasswordForm>
              <Button type="submit" primary={true}>
                {t('settings:buttons.password')}
              </Button>
            </PasswordForm>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={5}>
            <Header as="h4">{t('settings:headers.account')}</Header>
            {/* TODO: retrieve available locales from somewhere */}
            <AccountForm
              user={user}
              // eslint-disable-next-line flowtype/no-weak-types
              availableLocales={i18n.languages.map((language: string): any => {
                return { key: language, value: language, text: t(`settings:locales.${language}`) };
              })}
            >
              <Button type="submit" primary={true}>
                {t('settings:buttons.account')}
              </Button>
            </AccountForm>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
};

const AccountPane = withNamespaces()(PureAccountPane);

export { PureAccountPane };
export default AccountPane;
