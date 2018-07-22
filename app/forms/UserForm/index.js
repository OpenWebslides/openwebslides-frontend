// @flow

import * as React from 'react';
import { Field, reduxForm, type FieldProps } from 'redux-form';
// #TODO see https://github.com/erikras/redux-form/issues/3630#issue-276018629
// eslint-disable-next-line import/no-internal-modules
import { type FormProps } from 'redux-form/lib/types.js.flow';
import { translate, type TranslatorProps } from 'react-i18next';
import { Form, Input, Checkbox } from 'semantic-ui-react';

import SubmitButtonGroup from '../helpers/SubmitButtonGroup';

type UserFormValues = {|
  email?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  tosAccepted?: boolean,
|};

type PassedProps = {|
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
|};

type Props = {| ...TranslatorProps, ...$Exact<FormProps>, ...PassedProps |};

const renderCheckbox = (fieldProps: { ...$Exact<FieldProps>, label: string }): React.Node => {
  return (
    <Checkbox
      label={fieldProps.label}
      checked={fieldProps.input.checked}
      // eslint-disable-next-line react/jsx-no-bind
      onChange={(e, { checked }) => fieldProps.input.onChange(checked)}
      data-test-id="user-form-tos-accepted"
    />
  );
};

const PureUserForm = (props: Props): React.Node => {
  const { t, handleSubmit, children } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Field
          component={Input}
          type="text"
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
          type="text"
          name="firstName"
          placeholder={t('users:forms.firstname')}
          icon="user"
          iconPosition="left"
          required={true}
        />
      </Form.Field>
      <Form.Field>
        <Field
          component={Input}
          type="text"
          name="lastName"
          placeholder={t('users:forms.lastname')}
          icon="user"
          iconPosition="left"
        />
      </Form.Field>
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
          component={renderCheckbox}
          type="checkbox"
          name="tosAccepted"
          label={t('users:forms.tos')}
          toggle={true}
        />
      </Form.Field>

      { children || (<SubmitButtonGroup />)}
    </Form>
  );
};

PureUserForm.defaultProps = {
  children: null,
};

const UserForm = reduxForm({ form: 'userForm' })(translate()(PureUserForm));

export type { UserFormValues };
export { PureUserForm };
export default UserForm;
