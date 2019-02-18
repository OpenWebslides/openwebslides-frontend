// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Translation } from 'react-i18next';
import { Tab, Button, Grid, Header, Message } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import PasswordForm, { type PasswordFormValues } from 'forms/PasswordForm';

import actions from '../../../actions';
import * as m from '../../../model';

type PassedProps = {|
  user: m.User,
|};

type DispatchProps = {|
  onUpdatePassword: (currentPassword: string, password: string) => void,
|};

type Props = {| ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { user } = props;

  return {
    onUpdatePassword: (currentPassword: string, password: string): void => {
      dispatch(actions.updatePassword(user.id, currentPassword, password));
    },
  };
};

class PureAccountPane extends React.Component<Props> {
  handlePasswordFormSubmit = (values: PasswordFormValues): void => {
    const { onUpdatePassword } = this.props;
    onUpdatePassword(values.currentPassword, values.password);
  };

  render(): React.Node {
    return (
      <Translation>
        {(t: TFunction): React.Node => (
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
                    warning={true}
                    header={t('settings:account.close.title')}
                    content={t('settings:account.close.info')}
                  />
                  <Message
                    error={true}
                    content={t('settings:account.close.disabled')}
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
        )}
      </Translation>
    );
  }
}

const AccountPane = connect(null, mapDispatchToProps)(PureAccountPane);

export { PureAccountPane };
export default AccountPane;
