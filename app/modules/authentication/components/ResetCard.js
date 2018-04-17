// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import { Card } from 'semantic-ui-react';

import ResetForm from './forms/ResetForm';

type Props = TranslatorProps;

const PureResetCard = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Card fluid={true}>
      <Card.Content extra={true}>
        <Card.Header>
          {t('auth:reset.title')}
        </Card.Header>
        <Card.Description>
          {t('auth:reset.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <ResetForm />
      </Card.Content>
    </Card>
  );
};

const ResetCard = translate()(PureResetCard);

export { PureResetCard };
export default ResetCard;
