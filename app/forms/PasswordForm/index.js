// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Form, Divider } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { type TFunction } from 'types/i18next';
import FormErrorMessage from 'components/FormErrorMessage';

type PasswordFormValues = {|
  currentPassword: string,
  password: string,
  repeatPassword: string,
|};

type PasswordFormErrors = $ObjMap<PasswordFormValues, () => string>;

type PassedProps = {|
  onSubmit: (values: PasswordFormValues) => void,
  children: React.Node,
|};

type Props = {| ...PassedProps |};

class PurePasswordForm extends React.Component<Props> {
  validateForm = (values: PasswordFormValues): PasswordFormErrors => {
    const errors = {};

    if (values.currentPassword.length < 6) {
      errors.currentPassword = 'users:forms.errors.password';
    }

    if (values.password.length < 6) {
      errors.password = 'users:forms.errors.password';
    }

    if (values.password === values.currentPassword) {
      errors.password = 'users:forms.errors.equalNewPassword';
    }

    if (values.repeatPassword !== values.password) {
      errors.repeatPassword = 'users:forms.errors.repeatPassword';
    }

    return errors;
  };

  render(): React.Node {
    const { onSubmit, children } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Formik
            initialValues={{ currentPassword: '', password: '', repeatPassword: '' }}
            validate={this.validateForm}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>

                <FormErrorMessage name="currentPassword" />
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

                <Divider hidden={true} />

                {children}
              </Form>
            )}
          </Formik>
        )}
      </Translation>
    );
  }
}

const PasswordForm = PurePasswordForm;

export type { PasswordFormValues };
export { PurePasswordForm };
export default PasswordForm;
