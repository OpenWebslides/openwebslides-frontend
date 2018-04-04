// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import { Card } from 'semantic-ui-react';

import SignupForm from './forms/SignupForm';

type Props = TranslatorProps;

const PureSignupCard = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Card fluid={true}>
      <Card.Content extra={true}>
        <Card.Header>
          {t('auth:signup.title')}
        </Card.Header>
        <Card.Description>
          {t('auth:signup.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <SignupForm />
      </Card.Content>
    </Card>
  );
};

const SigninCard = translate()(PureSignupCard);

export { PureSignupCard };
export default SigninCard;
