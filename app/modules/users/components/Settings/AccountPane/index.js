// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Tab, Button, Grid, Header, Message } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import PasswordForm, { type PasswordFormValues } from 'forms/PasswordForm';
import users from 'modules/users';

type PassedProps = {|
  user: users.model.User,
|};

type DispatchProps = {|
  onUpdatePassword: (currentPassword: string, password: string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { user } = props;

  return {
    onUpdatePassword: (currentPassword: string, password: string): void => {
      dispatch(users.actions.updatePassword(user.id, currentPassword, password));
    },
  };
};

class PureAccountPane extends React.Component<Props> {
  handlePasswordFormSubmit = (values: PasswordFormValues): void => {
    const { onUpdatePassword } = this.props;
    onUpdatePassword(values.currentPassword, values.password);
  };

  render(): React.Node {
    const { t } = this.props;

    return (
      <Tab.Pane className="settings">
        <Grid columns={1} padded="vertically">
          <Grid.Row>
            <Grid.Column width={5}>
              <Header as="h4">{t('settings:account.password.title')}</Header>
              <PasswordForm onSubmit={this.handlePasswordFormSubmit}>
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
              <Button
                type="submit"
                primary={true}
                data-test-id="account-pane-close-account-button"
                disabled={true}
              >
                {t('settings:account.close.button')}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    );
  }
}

const AccountPane = connect(null, mapDispatchToProps)(withNamespaces()(PureAccountPane));

export { PureAccountPane };
export default AccountPane;
