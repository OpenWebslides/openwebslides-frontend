// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { type AppState } from 'types/redux';
import FetchWrapper from 'components/FetchWrapper';
import platform from 'modules/platform';
import topics from 'modules/topics';

import sidebarIdsToComponentsMap from './sidebarIdsToComponentsMap';

type PassedProps = {|
  topicId: string,
  enabledSidebarIds: $ReadOnlyArray<platform.model.SidebarId>,
|};

type StateProps = {|
  activeSidebarIds: $ReadOnlyArray<platform.model.SidebarId>,
|};

type Props = {| ...PassedProps, ...StateProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  return {
    activeSidebarIds: platform.selectors.getSettingByKey(state, { key: 'activeSidebarIds' }),
  };
};

class PureSidebars extends React.Component<Props> {
  renderSidebars = (topic: topics.model.Topic): React.Node => {
    const { activeSidebarIds, enabledSidebarIds } = this.props;
    let SidebarComponent: React.ComponentType<{| topic: topics.model.Topic |}>;

    // Intersect active and enabled sidebars
    const activeAndEnabledSidebarIds = activeSidebarIds.filter(
      (s) => enabledSidebarIds.includes(s),
    );

    return (
      <div className="sidebars__grid">
        {/* Reverse order so that newly activated sidebars appear to the left of existing ones */}
        {[...activeAndEnabledSidebarIds].reverse().map(
          (sidebarId: platform.model.SidebarId): React.Node => {
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
        renderPropsAndState={this.props}
        fetchId={topicId}
        fetchAction={topics.actions.fetch}
        fetchedPropSelector={topics.selectors.getById}
      />
    );
  }
}

const Sidebars = connect(mapStateToProps)(PureSidebars);

export { PureSidebars };
export default Sidebars;
