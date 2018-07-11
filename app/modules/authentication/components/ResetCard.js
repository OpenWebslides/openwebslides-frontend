// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import type { CustomTranslatorProps } from 'types/translator';


import ResetForm from './forms/ResetForm';

type Props = CustomTranslatorProps;

const PureResetCard = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Card fluid={true}>
      <Card.Content>
        <Card.Header>
          {t('authentication:reset.title')}
        </Card.Header>
        <Card.Description>
          {t('authentication:reset.description')}
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
