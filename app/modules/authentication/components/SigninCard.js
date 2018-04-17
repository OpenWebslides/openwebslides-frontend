// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import { Card, Button } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import SigninForm from './forms/SigninForm';

type Props = TranslatorProps;

const PureSigninCard = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Card fluid={true}>
      <Card.Content extra={true}>
        <Card.Header>
          {t('auth:signin.title')}
        </Card.Header>
        <Card.Description>
          {t('auth:signin.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <SigninForm />
      </Card.Content>
      <Card.Content extra={true}>
        <Button secondary={true} fluid={true} as={Link} to="/auth/reset">
          {t('auth:button.forgot')}
        </Button>
      </Card.Content>
    </Card>
  );
};

const SigninCard = translate()(PureSigninCard);

export { PureSigninCard };
export default SigninCard;
