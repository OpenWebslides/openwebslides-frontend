// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import { Header, Item } from 'semantic-ui-react';

import type { CustomTranslatorProps } from 'types/translator';
import topics from 'modules/topics';

type Topic = topics.model.Topic;

type PassedProps = {
  topic: Topic,
};

type Props = CustomTranslatorProps & PassedProps;

const PureInfoSidebar = (props: Props): React.Node => {
  const {
    t,
    topic,
  } = props;

  return (
    <React.Fragment>
      <Header>{t('sidebar:info.header')}</Header>
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
            { // TODO: change when it is available in Topic
            }
            <Item.Description>Public</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </React.Fragment>
  );
};

const InfoSidebar = translate()(PureInfoSidebar);

export { PureInfoSidebar };
export default InfoSidebar;
