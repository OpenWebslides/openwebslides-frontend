// @flow

import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

import { type FormProps } from 'types/form';
import SubmitButtonGroup from 'components/SubmitButtonGroup';

type EmailAndPasswordFormValues = {|
  email?: string,
  password?: string,
|};

type PassedProps = {|
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
|};

type Props = {| ...TranslatorProps, ...$Exact<FormProps>, ...PassedProps |};

const PureEmailAndPasswordForm = (props: Props): React.Node => {
  const { t, handleSubmit, children } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Field
          component={Input}
          name="email"
          placeholder={t('users:forms.email')}
          icon="at"
          iconPosition="left"
          required={true}
        />
      </Form.Field>
      <Form.Field>
        <Field
          component={Input}
          name="password"
          type="password"
          placeholder={t('users:forms.password')}
          icon="lock"
          iconPosition="left"
          required={true}
        />
      </Form.Field>

      { (children != null) ? children : (<SubmitButtonGroup />)}
    </Form>
  );
};

PureEmailAndPasswordForm.defaultProps = {
  children: null,
};

const EmailAndPasswordForm = withNamespaces()(
  reduxForm({ form: 'emailAndPasswordForm' })(PureEmailAndPasswordForm),
);

export type { EmailAndPasswordFormValues };
export { PureEmailAndPasswordForm };
export default EmailAndPasswordForm;
