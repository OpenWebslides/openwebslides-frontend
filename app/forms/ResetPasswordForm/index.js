// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message, Input } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

import SubmitButtonGroup from 'components/SubmitButtonGroup';

type ResetPasswordFormValues = {|
  password: string,
  repeatPassword: string,
  resetPasswordToken: string,
|};

type PassedProps = {|
  onSubmit: (values: ResetPasswordFormValues) => void,
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
  resetPasswordToken: string,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureResetPasswordForm extends React.Component<Props> {
  validateForm = (values: ResetPasswordFormValues): ResetPasswordFormValues => {
    const { t } = this.props;

    const errors = {};

    if (values.password == null || values.password.length < 6) {
      errors.password = t('users:forms.errors.password');
    }

    if (values.repeatPassword !== values.password) {
      errors.repeatPassword = t('users:forms.errors.repeatPassword');
    }

    if (values.resetPasswordToken == null || values.resetPasswordToken === '') {
      errors.resetPasswordToken = t('users:forms.errors.resetPasswordToken');
    }

    return { ...errors };
  }

  render(): React.Node {
    const { t, onSubmit, children, resetPasswordToken } = this.props;

    return (
      <Formik
        initialValues={{ password: '', repeatPassword: '', resetPasswordToken }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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

            <ErrorMessage name="resetPasswordToken" component={Message} negative={true} />
            <Field
              component={Input}
              type="hidden"
              name="resetPasswordToken"
              id="resetPasswordToken"
              required={true}
              value={values.resetPasswordToken}
            />

            { (children != null) ? children : (<SubmitButtonGroup />)}
          </Form>
        )}
      </Formik>
    );
  }
}

const ResetPasswordForm = withNamespaces()(PureResetPasswordForm);

export type { ResetPasswordFormValues };
export { PureResetPasswordForm };
export default ResetPasswordForm;
