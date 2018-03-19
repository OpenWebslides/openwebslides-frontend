// @flow

import React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

type Props = TranslatorProps;

const PureSigninForm = (props: Props): React.node => {
  const { t } = props;

  return (
    <Form>
      <Form.Field>
        <Input placeholder={t('auth:input.email')} icon="at" iconPosition="left" />
      </Form.Field>
      <Form.Field>
        <Input type="password" placeholder={t('auth:input.password')} icon="lock" iconPosition="left" />
      </Form.Field>
    </Form>
  );
};

const SigninForm = translate()(PureSigninForm);

export { PureSigninForm };
export default SigninForm;
