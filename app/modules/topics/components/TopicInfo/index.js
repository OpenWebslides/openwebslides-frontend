// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Item, Icon } from 'semantic-ui-react';

import * as m from '../../model';

import ForkInfo from './ForkInfo';

type PassedProps = {|
  topic: m.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureTopicInfo = (props: Props): React.Node => {
  const { t, topic } = props;

  return (
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header>{t('topics:props.title')}</Item.Header>
          <Item.Description>{topic.title}</Item.Description>
          {(topic.upstreamTopicId != null) ? (
            <Item.Extra data-test-id="topic-info-fork-info">
              <ForkInfo upstreamTopicId={topic.upstreamTopicId} />
            </Item.Extra>
          ) : ''}
        </Item.Content>
      </Item>
      <Item>
        <Item.Content>
          <Item.Header>{t('topics:props.description')}</Item.Header>
          <Item.Description data-test-id="topic-info-description">
            {(topic.description != null) ? topic.description : `(${t('topics:props.noDescription')})`}
          </Item.Description>
        </Item.Content>
      </Item>
      <Item>
        <Item.Content>
          <Item.Header>{t('topics:props.access.title')}</Item.Header>
          <Item.Description>{t(`topics:props.access.accessForType.${topic.access}`)}</Item.Description>
          <Item.Extra>
            <Icon name="info" /> {t(`topics:props.access.accessDescriptionForType.${topic.access}`)}
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

const TopicInfo = withNamespaces()(PureTopicInfo);

export { PureTopicInfo };
export default TopicInfo;
