// @flow

import React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { Form, Input } from 'semantic-ui-react';

type Props = TranslatorProps;

const PureSigninForm = (props: Props): React.node => {
  const { t } = props;

  return (
    <Form>
      <Form.Field>
        <Field
          component={Input}
          placeholder={t('auth:input.email')}
          icon="at"
          iconPosition="left"
        />
      </Form.Field>
      <Form.Field>
        <Field
          component={Input}
          type="password"
          placeholder={t('auth:input.password')}
          icon="lock"
          iconPosition="left"
        />
      </Form.Field>
    </Form>
  );
};

const ReduxSigninForm = reduxForm({
  // Unique name for the from
  form: 'signin',
})(PureSigninForm);
const SigninForm = translate()(ReduxSigninForm);

export { PureSigninForm, ReduxSigninForm };
export default SigninForm;
