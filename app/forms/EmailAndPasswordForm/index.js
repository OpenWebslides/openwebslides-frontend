// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

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

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureEmailAndPasswordForm extends React.Component<Props> {
  validateForm = (values: EmailAndPasswordFormValues): EmailAndPasswordFormValues => {
    const { t } = this.props;

    const errors = {};

    if (values.email == null || !values.email.includes('@')) {
      errors.email = t('users:forms.errors.email');
    }

    if (values.password == null || values.password.length < 6) {
      errors.password = t('users:forms.errors.password');
    }

    return { ...errors };
  }

  render(): React.Node {
    const { t, onSubmit, children } = this.props;

    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <ErrorMessage name="email" component={Message} negative={true} />
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

            { (children != null) ? children : (<SubmitButtonGroup />)}
          </Form>
        )}
      </Formik>
    );
  }
}

const EmailAndPasswordForm = withNamespaces()(PureEmailAndPasswordForm);

export type { EmailAndPasswordFormValues };
export { PureEmailAndPasswordForm };
export default EmailAndPasswordForm;
