// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Tab, Button, Grid, Icon } from 'semantic-ui-react';

import { type DropdownValue } from 'types/forms';
import { type ModulesAction } from 'types/redux';
import ProfileForm, { type ProfileFormValues } from 'forms/ProfileForm';

import actions from '../../../actions';
import * as m from '../../../model';

type PassedProps = {|
  user: m.User,
|};

type DispatchProps = {|
  onUpdateUser: (name: string, locale: string, alertEmails: boolean) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { user } = props;

  return {
    onUpdateUser: (name: string, locale: string, alertEmails: boolean): void => {
      dispatch(actions.update(user.id, name, locale, alertEmails));
    },
  };
};

class PureProfilePane extends React.Component<Props> {
  handleProfileFormSubmit = (values: ProfileFormValues): void => {
    const { onUpdateUser } = this.props;
    onUpdateUser(values.name, values.locale, values.alertEmails);
  };

  render(): React.Node {
    const { t, i18n, user } = this.props;

    return (
      <Tab.Pane className="settings">
        <Grid columns={1} padded="vertically">
          <Grid.Row>
            <Grid.Column width={5}>
              <p>
                <Icon name="lock" /> {t('settings:profile.privacy')}
              </p>
              <ProfileForm
                onSubmit={this.handleProfileFormSubmit}
                user={user}
                availableLocales={i18n.languages.map((language: string): DropdownValue => {
                  return { key: language, value: language, text: t(`settings:locales.${language}`) };
                })}
                data-test-id="profile-pane-profile-form"
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
  }
}

const ProfilePane = connect(null, mapDispatchToProps)(withNamespaces()(PureProfilePane));

export { PureProfilePane };
export default ProfilePane;
