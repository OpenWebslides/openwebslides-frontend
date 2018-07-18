// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import Page from 'core-components/Page';
import platform from 'modules/platform';
import topics from 'modules/topics';

const { AuthWrapper } = platform.components;
const { NewTopicCard } = topics.components;

type Props = TranslatorProps;

const PureNewTopicPage = (props: Props): React.Node => {
  const {
    t,
  } = props;

  return (
    <Page>
      <AuthWrapper>
        <React.Fragment>
          <h1>{t('global:title.createNewTopic')}</h1>
          <NewTopicCard />
        </React.Fragment>
      </AuthWrapper>
    </Page>
  );
};

const NewTopicPage = translate()(PureNewTopicPage);

export { PureNewTopicPage };
export default NewTopicPage;
