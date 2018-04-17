// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import { Card } from 'semantic-ui-react';

import ConfirmForm from './forms/ConfirmForm';

type Props = TranslatorProps;

const PureConfirmCard = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Card fluid={true}>
      <Card.Content extra={true}>
        <Card.Header>
          {t('auth:confirm.title')}
        </Card.Header>
        <Card.Description>
          {t('auth:confirm.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <ConfirmForm />
      </Card.Content>
    </Card>
  );
};

const ConfirmCard = translate()(PureConfirmCard);

export { PureConfirmCard };
export default ConfirmCard;
