// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Header, Icon, Item } from 'semantic-ui-react';

import topics from 'modules/topics';

import Sidebar from './helpers/Sidebar';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureTopicInfoSidebar = (props: Props): React.Node => {
  const { t, topic } = props;

  return (
    <Sidebar
      className="sidebar--topic-info"
      header={t('sidebar:info.header')}
      icon="info circle"
    >
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>Title</Item.Header>
            <Item.Description>{topic.title}</Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>Description</Item.Header>
            <Item.Description>{topic.description || `(${t('topics:noDescription')})`}</Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>Access level</Item.Header>
            { /* TODO: change when it is available in Topic */ }
            <Item.Description>Public</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Sidebar>
  );
};

const TopicInfoSidebar = translate()(PureTopicInfoSidebar);

export { PureTopicInfoSidebar };
export default TopicInfoSidebar;
