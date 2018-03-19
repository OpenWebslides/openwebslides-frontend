// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import { Card } from 'semantic-ui-react';

import SigninForm from './forms/SigninForm';

type Props = TranslatorProps;

const PureSigninCard = (props: Props): React.node => {
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
    </Card>
  );
};

const SigninCard = translate()(PureSigninCard);

export { PureSigninCard };
export default SigninCard;
