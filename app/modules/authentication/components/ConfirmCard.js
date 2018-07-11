// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import type { CustomTranslatorProps } from 'types/translator';


import ConfirmForm from './forms/ConfirmForm';

type Props = CustomTranslatorProps;

const PureConfirmCard = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Card fluid={true}>
      <Card.Content>
        <Card.Header>
          {t('authentication:confirm.title')}
        </Card.Header>
        <Card.Description>
          {t('authentication:confirm.description')}
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
