// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { type State } from 'types/state';
import topics from 'modules/topics';

import * as m from '../../model';
import selectors from '../../selectors';

import sidebarIdsToComponentsMap from './sidebarIdsToComponentsMap';

type PassedProps = {|
  topicId: string,
|};

type StateProps = {|
  topic: topics.model.Topic,
  activeSidebarIds: $ReadOnlyArray<m.SidebarId>,
|};

type Props = {| ...PassedProps, ...StateProps |};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { topicId } = props;

  return {
    topic: topics.selectors.getById(state, { id: topicId }),
    activeSidebarIds: selectors.getSettingByKey(state, { key: 'activeSidebarIds' }),
  };
};

const PureSidebars = (props: Props): React.Node => {
  const { topic, activeSidebarIds } = props;
  let SidebarComponent: React.ComponentType<{| topic: topics.model.Topic |}>;

  return (
    <div className="sidebars__grid">
      { /* Reverse order so that newly activated sidebars appear to the left of existing ones */ }
      {[...activeSidebarIds].reverse().map((sidebarId: m.SidebarId): React.Node => {
        SidebarComponent = sidebarIdsToComponentsMap[sidebarId];
        return (
          <div key={sidebarId} className="sidebars__grid-item" data-test-id="sidebars-grid-item">
            <SidebarComponent topic={topic} />
          </div>
        );
      })}
    </div>
  );
};

const Sidebars = connect(mapStateToProps)(PureSidebars);

export { PureSidebars };
export default Sidebars;
