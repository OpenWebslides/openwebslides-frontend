// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import type { CustomTranslatorProps } from 'types/translator';
import api from 'modules/api';

import { API_POST_TOKEN } from '../actionTypes';

import SigninForm from './forms/SigninForm';

const { ApiDimmer } = api.components;

type Props = CustomTranslatorProps;

const PureSigninCard = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Card fluid={true}>
      <ApiDimmer request={API_POST_TOKEN} />

      <Card.Content>
        <Card.Header>
          {t('authentication:signin.title')}
        </Card.Header>
        <Card.Description>
          {t('authentication:signin.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <SigninForm />
      </Card.Content>
      <Card.Content>
        <Button secondary={true} fluid={true} as={Link} to="/auth/reset">
          {t('authentication:button.forgot')}
        </Button>
        <Button secondary={true} fluid={true} as={Link} to="/auth/confirm">
          {t('authentication:button.confirm')}
        </Button>
      </Card.Content>
    </Card>
  );
};

const SigninCard = translate()(PureSigninCard);

export { PureSigninCard };
export default SigninCard;
