// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';

import topics from 'modules/topics';

import Sidebar from './Sidebar';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const { Contribute } = topics.components;

const PureContributeSidebar = (props: Props): React.Node => {
  const { t, topic } = props;

  return (
    <Sidebar
      className="sidebar--contribute"
      header={t('topics:sidebars.contribute.header')}
      icon="send"
    >
      <Contribute topic={topic} />
    </Sidebar>
  );
};

const ContributeSidebar = withNamespaces()(PureContributeSidebar);

export { PureContributeSidebar };
export default ContributeSidebar;
