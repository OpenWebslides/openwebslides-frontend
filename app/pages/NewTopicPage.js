// @flow

import * as React from 'react';
import { translate } from 'react-i18next';

import Page from 'core-components/Page';
import type { CustomTranslatorProps } from 'types/translator';
import topics from 'modules/topics';

const { NewTopicCard } = topics.components;

type Props = CustomTranslatorProps;

const PureNewTopicPage = (props: Props): React.Node => {
  const {
    t,
  } = props;

  return (
    // $FlowFixMe Can't figure out cause; Page component needs rewriting anyway #TODO
    <Page needsAuth={true}>
      <React.Fragment>
        <h1>{t('global:title.createNewTopic')}</h1>
        <NewTopicCard />
      </React.Fragment>
    </Page>
  );
};

const NewTopicPage = translate()(PureNewTopicPage);

export { PureNewTopicPage };
export default NewTopicPage;