// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';

import topics from 'modules/topics';

import Sidebar from './Sidebar';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const { ShareUpdates } = topics.components;

const PureShareUpdatesSidebar = (props: Props): React.Node => {
  const { t, topic } = props;

  return (
    <Sidebar
      className="sidebar--share-updates"
      header={t('topics:sidebars.shareUpdates.header')}
      icon="tasks"
    >
      <ShareUpdates topic={topic} />
    </Sidebar>
  );
};

const ShareUpdatesSidebar = withNamespaces()(PureShareUpdatesSidebar);

export { PureShareUpdatesSidebar };
export default ShareUpdatesSidebar;
