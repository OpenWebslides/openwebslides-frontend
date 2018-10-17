// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';

import topics from 'modules/topics';

import Sidebar from './Sidebar';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const { TopicInfo } = topics.components;

const PureTopicInfoSidebar = (props: Props): React.Node => {
  const { t, topic } = props;

  return (
    <Sidebar
      className="sidebar--topic-info"
      header={t('topics:sidebars.topicInfo.header')}
      icon="info circle"
    >
      <TopicInfo topic={topic} />
    </Sidebar>
  );
};

const TopicInfoSidebar = withNamespaces()(PureTopicInfoSidebar);

export { PureTopicInfoSidebar };
export default TopicInfoSidebar;
