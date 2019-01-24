// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Card } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import PrivacyPolicy from 'assets/files/PRIVACY.md';

type Props = {| ...TranslatorProps |};

const PureTosPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <ContainerPageWrapper>
      <Card centered={true} style={{ width: '800px' }}>
        <Card.Content>
          <Card.Header>
            {t('platform:tosCard.title')}
          </Card.Header>
          <Card.Description>
            {t('platform:tosCard.date')}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <ReactMarkdown
            className="inline-markdown"
            source={PrivacyPolicy}
          />
        </Card.Content>
      </Card>
    </ContainerPageWrapper>
  );
};

const TosPage = withNamespaces()(PureTosPage);

export { PureTosPage };
export default TosPage;
