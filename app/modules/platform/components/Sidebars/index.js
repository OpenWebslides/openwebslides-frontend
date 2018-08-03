// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { type State } from 'types/state';
import FetchWrapper from 'components/FetchWrapper';
import topics from 'modules/topics';

import * as m from '../../model';
import selectors from '../../selectors';

import sidebarIdsToComponentsMap from './sidebarIdsToComponentsMap';

type PassedProps = {|
  topicId: string,
|};

type StateProps = {|
  activeSidebarIds: $ReadOnlyArray<m.SidebarId>,
|};

type Props = {| ...PassedProps, ...StateProps |};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    activeSidebarIds: selectors.getSettingByKey(state, { key: 'activeSidebarIds' }),
  };
};

class PureSidebars extends React.Component<Props> {
  renderSidebars = (topic: topics.model.Topic): React.Node => {
    const { activeSidebarIds } = this.props;
    let SidebarComponent: React.ComponentType<{| topic: topics.model.Topic |}>;

    return (
      <div className="sidebars__grid">
        {/* Reverse order so that newly activated sidebars appear to the left of existing ones */}
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

  render(): React.Node {
    const { topicId } = this.props;

    return (
      <FetchWrapper
        render={this.renderSidebars}
        fetchId={topicId}
        fetchAction={topics.actions.get}
        fetchedPropSelector={topics.selectors.getById}
      />
    );
  }
}

const Sidebars = connect(mapStateToProps)(PureSidebars);

export { PureSidebars };
export default Sidebars;
