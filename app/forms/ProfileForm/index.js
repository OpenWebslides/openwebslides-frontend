// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message, Divider, Grid } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

import { type DropdownValue } from 'types/forms';
import SemanticField from 'components/SemanticField';
import users from 'modules/users';

type ProfileFormValues = {|
  name: string,
  email: string,
  locale: string,
  alertEmails: boolean,
  age: number,
  gender: users.model.GenderType,
  role: users.model.RoleType,
  country: string,
|};

type PassedProps = {|
  availableLocales: $ReadOnlyArray<DropdownValue>,
  availableGenders: $ReadOnlyArray<DropdownValue>,
  availableRoles: $ReadOnlyArray<DropdownValue>,
  availableCountries: $ReadOnlyArray<DropdownValue>,
  user: users.model.User,
  onSubmit: (values: ProfileFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureProfileForm extends React.Component<Props> {
  validateForm = (values: ProfileFormValues): ProfileFormValues => {
    const {
      t,
      availableLocales,
      availableGenders,
      availableRoles,
      availableCountries,
    } = this.props;

    const errors = {};

    if (values.name === '') {
      errors.name = t('users:forms.errors.name');
    }

    if (!values.email.includes('@')) {
      errors.email = t('users:forms.errors.email');
    }

    // eslint-disable-next-line flowtype/no-weak-types
    const match = availableLocales.filter((locale: any): boolean => {
      return locale.value === values.locale;
    });
    if (match.length === 0) {
      errors.locale = t('users:forms.errors.locale');
    }

    if (values.alertEmails == null) {
      errors.alertEmails = t('users:forms.errors.alertEmails');
    }

    if (values.age == null) {
      errors.age = t('users:forms.errors.age');
    }

    // eslint-disable-next-line flowtype/no-weak-types
    const genderMatch = availableGenders.filter((gender: any): boolean => {
      return gender.value === values.gender;
    });
    if (genderMatch.length === 0) {
      errors.gender = t('users:forms.errors.gender');
    }

    // eslint-disable-next-line flowtype/no-weak-types
    const roleMatch = availableRoles.filter((role: any): boolean => {
      return role.value === values.role;
    });
    if (roleMatch.length === 0) {
      errors.role = t('users:forms.errors.role');
    }

    // eslint-disable-next-line flowtype/no-weak-types
    const countryMatch = availableCountries.filter((country: any): boolean => {
      return country.value === values.country;
    });
    if (countryMatch.length === 0) {
      errors.country = t('users:forms.errors.country');
    }

    return { ...errors };
  };

  render(): React.Node {
    const {
      t,
      onSubmit,
      children,
      user,
      availableLocales,
      availableGenders,
      availableRoles,
      availableCountries,
    } = this.props;

    return (
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          locale: user.locale,
          alertEmails: user.alertEmails,
          age: user.age,
          gender: user.gender,
          role: user.role,
          country: user.country,
        }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid columns={2}>
              <Grid.Column>
                <ErrorMessage name="name" component={Message} negative={true} />
                <Field
                  component={Form.Input}
                  name="name"
                  id="name"
                  label={t('users:forms.name')}
                  placeholder={t('users:forms.name')}
                  icon="user"
                  iconPosition="left"
                  required={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  data-test-id="profile-form-field-name"
                />

                <ErrorMessage name="email" component={Message} negative={true} />
                <Field
                  component={Form.Input}
                  name="email"
                  id="email"
                  placeholder={t('users:forms.email')}
                  label={t('users:forms.emailDisabled')}
                  icon="at"
                  iconPosition="left"
                  required={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  disabled={true}
                  data-test-id="profile-form-field-email"
                />

                <ErrorMessage name="locale" component={Message} negative={true} />
                <SemanticField
                  component={Form.Dropdown}
                  name="locale"
                  id="locale"
                  placeholder={t('users:forms.locale')}
                  label={t('users:forms.locale')}
                  required={true}
                  selection={true}
                  value={values.locale}
                  options={availableLocales}
                  data-test-id="profile-form-field-locale"
                />

                <ErrorMessage name="alertEmails" component={Message} negative={true} />
                <Field
                  component={Form.Checkbox}
                  type="checkbox"
                  toggle={true}
                  name="alertEmails"
                  id="alertEmails"
                  label={t('users:forms.alertEmails')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.locale}
                  checked={values.alertEmails}
                  data-test-id="profile-form-field-alert-emails"
                />
              </Grid.Column>
              <Grid.Column>
                <ErrorMessage name="age" component={Message} negative={true} />
                <Field
                  component={Form.Input}
                  type="number"
                  min="12"
                  max="99"
                  ste="1"
                  name="age"
                  id="age"
                  placeholder={t('users:forms.age')}
                  label={t('users:forms.age')}
                  required={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                  data-test-id="profile-form-field-age"
                />

                <ErrorMessage name="gender" component={Message} negative={true} />
                <SemanticField
                  component={Form.Dropdown}
                  name="gender"
                  id="gender"
                  placeholder={t('users:forms.gender')}
                  label={t('users:forms.gender')}
                  required={true}
                  selection={true}
                  value={values.gender}
                  options={availableGenders}
                  data-test-id="profile-form-field-gender"
                />

                <ErrorMessage name="role" component={Message} negative={true} />
                <SemanticField
                  component={Form.Dropdown}
                  name="role"
                  id="role"
                  placeholder={t('users:forms.role')}
                  label={t('users:forms.role')}
                  required={true}
                  selection={true}
                  value={values.role}
                  options={availableRoles}
                  data-test-id="profile-form-field-role"
                />

                <ErrorMessage name="country" component={Message} negative={true} />
                <SemanticField
                  component={Form.Dropdown}
                  name="country"
                  id="country"
                  placeholder={t('users:forms.country')}
                  label={t('users:forms.country')}
                  required={true}
                  selection={true}
                  value={values.country}
                  options={availableCountries}
                  data-test-id="profile-form-field-country"
                />
              </Grid.Column>
            </Grid>

            <Divider hidden={true} />

            {children}
          </Form>
        )}
      </Formik>
    );
  }
}

const ProfileForm = withNamespaces()(PureProfileForm);

export type { ProfileFormValues };
export { PureProfileForm };
export default ProfileForm;
