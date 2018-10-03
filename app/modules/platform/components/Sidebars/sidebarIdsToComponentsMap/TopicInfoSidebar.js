// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Item, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import topics from 'modules/topics';
import makeRoute from 'lib/makeRoute';

import Sidebar from './Sidebar';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

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
              <Item.Extra>
                <Icon name="fork" size="small" />
                <Link to={makeRoute(TOPIC_EDITOR_ROUTE, { topicId: topic.upstreamTopicId })}>
                  <small>
                    {t('topics:sidebars.topicInfo.forkedFrom', { topic: topic.upstreamTopicId })}
                  </small>
                </Link>
              </Item.Extra>
            ) : ''}
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>{t('topics:props.description')}</Item.Header>
            <Item.Description data-test-id="topic-info-sidebar-topic-description">
              {(topic.description != null) ? topic.description : `(${t('topics:noDescription')})`}
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

const TopicInfoSidebar = translate()(PureTopicInfoSidebar);

export { PureTopicInfoSidebar };
export default TopicInfoSidebar;
