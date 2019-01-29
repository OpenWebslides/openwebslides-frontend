// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Tab, Button, Grid, Icon } from 'semantic-ui-react';
import { getCodes, getName, getCodeList } from 'country-list';

import { type DropdownValue } from 'types/forms';
import { type ModulesAction } from 'types/redux';
import ProfileForm, { type ProfileFormValues } from 'forms/ProfileForm';

import actions from '../../../actions';
import * as m from '../../../model';

type PassedProps = {|
  user: m.User,
|};

type DispatchProps = {|
  onUpdateUser: (
    name: string,
    locale: string,
    alertEmails: boolean,
    age: number,
    gender: users.model.GenderType,
    role: users.model.RoleType,
    country: string,
  ) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { user } = props;

  return {
    onUpdateUser: (
      name: string,
      locale: string,
      alertEmails: boolean,
      age: number,
      gender: users.model.GenderType,
      role: users.model.RoleType,
      country: string,
    ): void => {
      dispatch(users.actions.update(
        user.id,
        name,
        locale,
        alertEmails,
        age,
        gender,
        role,
        country,
      ));
    },
  };
};

class PureProfilePane extends React.Component<Props> {
  handleProfileFormSubmit = (values: ProfileFormValues): void => {
    const { onUpdateUser } = this.props;
    const { name, locale, alertEmails, age, gender, role, country } = values;

    onUpdateUser(
      name,
      locale,
      alertEmails,
      age,
      gender,
      role,
      country,
    );
  };

  render(): React.Node {
    const { t, i18n, user } = this.props;

    return (
      <Tab.Pane className="settings">
        <Grid columns={1} padded="vertically">
          <Grid.Row>
            <Grid.Column width={10}>
              <p>
                <Icon name="lock" /> {t('settings:profile.privacy')}
              </p>
              <ProfileForm
                onSubmit={this.handleProfileFormSubmit}
                user={user}
                availableLocales={i18n.languages.map((language: string): DropdownValue => {
                  return { key: language, value: language, text: t(`settings:locales.${language}`) };
                })}
                availableGenders={Object.keys(users.model.genderTypes).map(
                  (g: string): DropdownValue => {
                    const genderType = users.model.genderTypes[g];

                    return { key: genderType, value: genderType, text: t(`settings:genders.${genderType}`) };
                  },
                )}
                availableRoles={Object.keys(users.model.roleTypes).map(
                  (r: string): DropdownValue => {
                    const roleType = users.model.roleTypes[r];

                    return { key: roleType, value: roleType, text: t(`settings:roles.${roleType}`) };
                  },
                )}
                availableCountries={Object.entries(getCodeList()).map(
                  (c: [string, string]): DropdownValue => {
                    return { key: c[0], value: c[0].toUpperCase(), text: c[1] };
                  },
                )}
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
