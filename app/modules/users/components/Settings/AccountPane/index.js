// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Tab, Button, Grid, Header, Message } from 'semantic-ui-react';

import PasswordForm from 'forms/PasswordForm';
import users from 'modules/users';

type PassedProps = {|
  user: users.model.User,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureAccountPane = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Tab.Pane className="settings">
      <Grid columns={1} padded="vertically">
        <Grid.Row>
          <Grid.Column width={5}>
            <Header as="h4">{t('settings:account.password.title')}</Header>
            <PasswordForm>
              <Button type="submit" primary={true}>
                {t('settings:account.password.button')}
              </Button>
            </PasswordForm>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={5}>
            <Header as="h4">{t('settings:account.close.title')}</Header>
            <Message
              error={true}
              header={t('settings:account.close.title')}
              content={t('settings:account.close.info')}
            />
            <Button type="submit" primary={true}>
              {t('settings:account.close.button')}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Tab.Pane>
  );
};

const AccountPane = withNamespaces()(PureAccountPane);

export { PureAccountPane };
export default AccountPane;
