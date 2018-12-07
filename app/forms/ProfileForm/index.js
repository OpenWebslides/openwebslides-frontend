// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message, Divider } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

import SemanticField from 'components/SemanticField';
import users from 'modules/users';

type ProfileFormValues = {|
  name: string,
  email: string,
  locale: string,
  alertEmails: boolean,
|};

type PassedProps = {|
  // eslint-disable-next-line flowtype/no-weak-types
  availableLocales: $ReadOnlyArray<any>,
  user: users.model.User,
  onSubmit: (values: ProfileFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureProfileForm extends React.Component<Props> {
  validateForm = (values: ProfileFormValues): ProfileFormValues => {
    const { t, availableLocales } = this.props;

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

    return { ...errors };
  };

  render(): React.Node {
    const { t, onSubmit, children, user, availableLocales } = this.props;

    return (
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          locale: user.locale,
          alertEmails: user.alertEmails,
        }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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
            />

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
