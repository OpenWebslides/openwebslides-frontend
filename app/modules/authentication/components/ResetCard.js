// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import formComponents from './forms';

const ResetForm = formComponents.ResetForm;

type Props = TranslatorProps;

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
