// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Item } from 'semantic-ui-react';

import topics from 'modules/topics';

import Sidebar from './Sidebar';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const { ForkInfo } = topics.components;

const PureTopicInfoSidebar = (props: Props): React.Node => {
  const { t, topic } = props;

  return (
    <Sidebar
      className="sidebar--topic-info"
      header={t('topics:sidebars.topicInfo.header')}
      icon="info circle"
    >
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>{t('topics:props.title')}</Item.Header>
            <Item.Description>{topic.title}</Item.Description>
            {(topic.upstreamTopicId != null) ? (
              <Item.Extra data-test-id="topic-info-sidebar-fork-info">
                <ForkInfo upstreamTopicId={topic.upstreamTopicId} />
              </Item.Extra>
            ) : ''}
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>{t('topics:props.description')}</Item.Header>
            <Item.Description data-test-id="topic-info-sidebar-topic-description">
              {(topic.description != null) ? topic.description : `(${t('topics:props.noDescription')})`}
            </Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>{t('topics:props.accessLevel')}</Item.Header>
            { /* TODO: change when it is available in Topic */ }
            <Item.Description>Public</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Sidebar>
  );
};

const TopicInfoSidebar = withNamespaces()(PureTopicInfoSidebar);

export { PureTopicInfoSidebar };
export default TopicInfoSidebar;
