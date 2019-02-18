// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';

import pullRequests from 'modules/pullRequests';
import topics from 'modules/topics';

import Sidebar from './Sidebar';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type Props = {| ...PassedProps |};

const { Contribute } = pullRequests.components;

const PureContributeSidebar = (props: Props): React.Node => {
  const { topic } = props;
  const [t] = useTranslation();

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

const ContributeSidebar = PureContributeSidebar;

export { PureContributeSidebar };
export default ContributeSidebar;
