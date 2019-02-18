// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { type TFunction } from 'types/i18next';
import FormErrorMessage from 'components/FormErrorMessage';
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

type Props = {| ...PassedProps |};

class PureResetPasswordForm extends React.Component<Props> {
  validateForm = (values: ResetPasswordFormValues): ResetPasswordFormValues => {
    const errors = {};

    if (values.password.length < 6) {
      errors.password = 'users:forms.errors.password';
    }

    if (values.repeatPassword !== values.password) {
      errors.repeatPassword = 'users:forms.errors.repeatPassword';
    }

    if (values.resetPasswordToken === '') {
      errors.resetPasswordToken = 'users:forms.errors.resetPasswordToken';
    }

    return { ...errors };
  };

  render(): React.Node {
    const { onSubmit, children, resetPasswordToken } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Formik
            initialValues={{ password: '', repeatPassword: '', resetPasswordToken }}
            validate={this.validateForm}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormErrorMessage name="password" />
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

                <FormErrorMessage name="repeatPassword" />
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

                <FormErrorMessage name="resetPasswordToken" />
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
        )}
      </Translation>
    );
  }
}

const ResetPasswordForm = PureResetPasswordForm;

export type { ResetPasswordFormValues };
export { PureResetPasswordForm };
export default ResetPasswordForm;
