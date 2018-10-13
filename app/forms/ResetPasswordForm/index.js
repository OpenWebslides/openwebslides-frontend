// @flow

import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

import { type FormProps } from 'types/form';
import SubmitButtonGroup from 'components/SubmitButtonGroup';

type ResetPasswordFormValues = {|
  password?: string,
  resetPasswordToken?: string,
|};

type PassedProps = {|
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
|};

type Props = {| ...TranslatorProps, ...$Exact<FormProps>, ...PassedProps |};

const PureResetPasswordForm = (props: Props): React.Node => {
  const { t, handleSubmit, children } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Field
          component={Input}
          type="password"
          name="password"
          placeholder={t('users:forms.password')}
          icon="lock"
          iconPosition="left"
          required={true}
        />
      </Form.Field>
      <Form.Field>
        <Field
          component={Input}
          type="password"
          name="repeatpassword"
          placeholder={t('users:forms.repeatpassword')}
          icon="lock"
          iconPosition="left"
          required={true}
        />
      </Form.Field>
      <Form.Field>
        <Field
          component={Input}
          type="hidden"
          name="resetPasswordToken"
          required={true}
        />
      </Form.Field>

      { (children != null) ? children : (<SubmitButtonGroup />)}
    </Form>
  );
};

PureResetPasswordForm.defaultProps = {
  children: null,
};

const ResetPasswordForm = reduxForm({ form: 'resetPasswordForm' })(
  withNamespaces()(PureResetPasswordForm),
);

export type { ResetPasswordFormValues };
export { PureResetPasswordForm };
export default ResetPasswordForm;
