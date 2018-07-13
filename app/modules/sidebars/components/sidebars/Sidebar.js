// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { ObjectNotFoundError } from 'errors';
import type { Identifier } from 'types/model';
import type { State } from 'types/state';
import topics from 'modules/topics';

import type { SidebarName } from '../../model';

import namesToComponentsMap from './helpers/namesToComponentsMap';

type Topic = topics.model.Topic;

type PassedProps = {|
  sidebarName: SidebarName,
  topicId: Identifier,
|};

type StateProps = {|
  topic: Topic,
|};

type Props = {|
  ...PassedProps,
  ...StateProps,
|};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { topicId } = props;
  const topic = topics.selectors.getById(state, { id: topicId });

  if (topic == null) {
    throw new ObjectNotFoundError('topics:topic', props.topicId);
  }

  return {
    topic,
  };
};

const PureSidebar = (props: Props): React.Node => {
  const {
    sidebarName,
    topic,
  } = props;

  const SidebarComponent = namesToComponentsMap[sidebarName];

  return (
    <div className="sidebar">
      <SidebarComponent topic={topic} />
    </div>
  );
};

const Sidebar = connect(mapStateToProps)(PureSidebar);

export { PureSidebar };
export default Sidebar;
