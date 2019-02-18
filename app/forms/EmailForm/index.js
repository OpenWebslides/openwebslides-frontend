// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Form } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { type TFunction } from 'types/i18next';
import FormErrorMessage from 'components/FormErrorMessage';
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

type Props = {| ...PassedProps |};

class PureEmailForm extends React.Component<Props> {
  validateForm = (values: EmailFormValues): EmailFormValues => {
    const errors = {};

    if (!values.email.includes('@')) {
      errors.email = 'users:forms.errors.email';
    }

    return { ...errors };
  };

  render(): React.Node {
    const { onSubmit, children } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Formik
            initialValues={{ email: '' }}
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

const EmailForm = PureEmailForm;

export type { EmailFormValues };
export { PureEmailForm };
export default EmailForm;
