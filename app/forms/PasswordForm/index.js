// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message, Divider } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

type PasswordFormValues = {|
  currentPassword: string,
  password: string,
  repeatPassword: string,
|};

type PassedProps = {|
  onSubmit: (values: PasswordFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PurePasswordForm extends React.Component<Props> {
  validateForm = (values: PasswordFormValues): PasswordFormValues => {
    const { t } = this.props;

    const errors = {};

    if (values.currentPassword.length < 6) {
      errors.currentPassword = t('users:forms.errors.password');
    }

    if (values.password.length < 6) {
      errors.password = t('users:forms.errors.password');
    }

    if (values.password === values.currentPassword) {
      errors.password = t('users:forms.errors.equalNewPassword');
    }

    if (values.repeatPassword !== values.password) {
      errors.repeatPassword = t('users:forms.errors.repeatPassword');
    }

    return { ...errors };
  };

  render(): React.Node {
    const { t, onSubmit, children } = this.props;

    return (
      <Formik
        initialValues={{ currentPassword: '', password: '', repeatPassword: '' }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <ErrorMessage name="currentPassword" component={Message} negative={true} />
            <Field
              component={Form.Input}
              type="password"
              name="currentPassword"
              id="currentPassword"
              placeholder={t('users:forms.currentPassword')}
              icon="lock"
              iconPosition="left"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.currentPassword}
            />

            <ErrorMessage name="password" component={Message} negative={true} />
            <Field
              component={Form.Input}
              type="password"
              name="password"
              id="password"
              placeholder={t('users:forms.password')}
              icon="lock"
              iconPosition="left"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            <ErrorMessage name="repeatPassword" component={Message} negative={true} />
            <Field
              component={Form.Input}
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              placeholder={t('users:forms.repeatPassword')}
              icon="lock"
              iconPosition="left"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repeatPassword}
            />

            <Divider hidden={true} />

            {children}
          </Form>
        )}
      </Formik>
    );
  }
}

const PasswordForm = withNamespaces()(PurePasswordForm);

export type { PasswordFormValues };
export { PurePasswordForm };
export default PasswordForm;