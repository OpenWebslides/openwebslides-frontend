// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import topics from 'modules/topics';

import Page from '../Page';

const { NewTopicCard } = topics.components;

type Props = CustomTranslatorProps;

const PureNewTopicPage = (props: Props): React.Node => {
  const {
    t,
  } = props;

  return (
    <Page>
      <h1>{t('pages:topic_new.title')}</h1>
      <NewTopicCard />
    </Page>
  );
};

const NewTopicPage = translate()(PureNewTopicPage);

export { PureNewTopicPage };
export default NewTopicPage;

