// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import topics from 'modules/topics';

import AuthenticatedPage from '../AuthenticatedPage';

const { NewTopicCard } = topics.components;

type Props = CustomTranslatorProps;

const PureNewTopicPage = (props: Props): React.Node => {
  const {
    t,
  } = props;

  return (

    <AuthenticatedPage>
      <h1>{t('global:createNewTopic.self')}</h1>
      <NewTopicCard />
    </AuthenticatedPage>
  );
};

const NewTopicPage = translate()(PureNewTopicPage);

export { PureNewTopicPage };
export default NewTopicPage;

