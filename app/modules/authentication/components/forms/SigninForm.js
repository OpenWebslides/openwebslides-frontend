// @flow

import React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { Card, Form, Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = TranslatorProps;

const PureSigninForm = (props: Props): React.node => {
  const { t } = props;

  return (
    <Form>
      <Form.Field>
        <Field
          component={Input}
          name="email"
          placeholder={t('auth:input.email')}
          icon="at"
          iconPosition="left"
        />
      </Form.Field>
      <Form.Field>
        <Field
          component={Input}
          name="password"
          type="password"
          placeholder={t('auth:input.password')}
          icon="lock"
          iconPosition="left"
        />
      </Form.Field>

      <Button.Group fluid={true}>
        <Button primary={true} type="submit">
          {t('auth:button.signin')}
        </Button>
        <Button basic={true} as={Link} to="/auth/signup">
          {t('auth:button.signup')}
        </Button>
      </Button.Group>
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
