// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import ContainerPageWrapper from 'components/ContainerPageWrapper';

type Props = {| ...TranslatorProps |};

const PureTosPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <ContainerPageWrapper>
      <Card centered={true}>
        <Card.Content>
          <Card.Header>
            {t('platform:tosCard.title')}
          </Card.Header>
          <Card.Description>
            {t('platform:tosCard.description')}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          {t('platform:tosCard.tos')}
        </Card.Content>
      </Card>
    </ContainerPageWrapper>
  );
};

const TosPage = withNamespaces()(PureTosPage);

export { PureTosPage };
export default TosPage;
