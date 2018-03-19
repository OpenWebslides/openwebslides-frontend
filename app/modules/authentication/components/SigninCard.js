// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import { Card, Form, Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import SigninForm from './forms/SigninForm';

type Props = TranslatorProps;

const PureSigninCard = (props: Props): React.node => {
  const { t, rootContentItem } = props;

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
        <Button.Group fluid={true}>
          <Button primary={true} type="submit">
            {t('auth:button.signin')}
          </Button>
          <Button basic={true} as={Link} to="/auth/signup">
            {t('auth:button.signup')}
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

const SigninCard = translate()(PureSigninCard);

export { PureSigninCard };
export default SigninCard;
