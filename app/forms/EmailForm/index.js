// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

import SubmitButtonGroup from 'components/SubmitButtonGroup';

type EmailFormValues = {|
  email: string,
|};

type PassedProps = {|
  onSubmit: (values: EmailFormValues) => void,
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureEmailForm extends React.Component<Props> {
  validateForm = (values: EmailFormValues): EmailFormValues => {
    const { t } = this.props;

    const errors = {};

    if (!values.email.includes('@')) {
      errors.email = t('users:forms.errors.email');
    }

    return { ...errors };
  };

  render(): React.Node {
    const { t, onSubmit, children } = this.props;

    return (
      <Formik
        initialValues={{ email: '' }}
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

            { (children != null) ? children : (<SubmitButtonGroup />)}
          </Form>
        )}
      </Formik>
    );
  }
}

const EmailForm = withNamespaces()(PureEmailForm);

export type { EmailFormValues };
export { PureEmailForm };
export default EmailForm;
