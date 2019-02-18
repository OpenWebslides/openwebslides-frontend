// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Form } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { type TFunction } from 'types/i18next';
import FormErrorMessage from 'components/FormErrorMessage';
import SubmitButtonGroup from 'components/SubmitButtonGroup';

type EmailAndPasswordFormValues = {|
  email: string,
  password: string,
|};

type PassedProps = {|
  onSubmit: (values: EmailAndPasswordFormValues) => void,
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
|};

type Props = {| ...PassedProps |};

class PureEmailAndPasswordForm extends React.Component<Props> {
  validateForm = (values: EmailAndPasswordFormValues): EmailAndPasswordFormValues => {
    const errors = {};

    if (!values.email.includes('@')) {
      errors.email = 'users:forms.errors.email';
    }

    if (values.password.length < 6) {
      errors.password = 'users:forms.errors.password';
    }

    return { ...errors };
  };

  render(): React.Node {
    const { onSubmit, children } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={this.validateForm}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormErrorMessage name="email" />
                <Field
                  component={Form.Input}
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t('users:forms.email')}
                  icon="at"
                  iconPosition="left"
                  required={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  data-test-id="email-field"
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
                  data-test-id="password-field"
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

const EmailAndPasswordForm = PureEmailAndPasswordForm;

export type { EmailAndPasswordFormValues };
export { PureEmailAndPasswordForm };
export default EmailAndPasswordForm;
