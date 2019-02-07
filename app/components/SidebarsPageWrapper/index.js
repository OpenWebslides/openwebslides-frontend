// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { type AppState } from 'types/redux';
import FlashMessages from 'components/FlashMessages';
import asyncRequests from 'modules/asyncRequests';
import platform from 'modules/platform';

import PageWrapper from '../PageWrapper';

import Sidebars from './Sidebars';

type PassedProps = {|
  children: React.Node,
  topicId: string,
  enabledSidebarIds: $ReadOnlyArray<platform.model.SidebarId>,
|};

type StateProps = {|
  activeAndEnabledSidebarIds: $ReadOnlyArray<platform.model.SidebarId>,
|};

type Props = {| ...PassedProps, ...StateProps |};

const { ApiDimmer } = asyncRequests.components;
const { SidebarsMenu } = platform.components;

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { enabledSidebarIds } = props;

  const activeSidebarIds = platform.selectors.getSettingByKey(state, { key: 'activeSidebarIds' });

  return {
    activeAndEnabledSidebarIds: activeSidebarIds.filter((s) => enabledSidebarIds.includes(s)),
  };
};

const PureSidebarsPageWrapper = (props: Props): React.Node => {
  const { children, topicId, enabledSidebarIds, activeAndEnabledSidebarIds } = props;

  const sidebarsWidthPercentage = activeAndEnabledSidebarIds.length * 20;

  return (
    <PageWrapper className="page--sidebars">
      <div className="page__grid">
        <div
          className="page__grid-item"
          style={{ width: `${100 - sidebarsWidthPercentage}%` }}
        >
          <div className="page__main-content">
            <ApiDimmer />
            <FlashMessages />
            {children}
          </div>
        </div>
        {(activeAndEnabledSidebarIds.length > 0) && (
          <div
            className="page__grid-item"
            style={{ width: `${sidebarsWidthPercentage}%` }}
          >
            <Sidebars
              topicId={topicId}
              enabledSidebarIds={enabledSidebarIds}
            />
          </div>
        )}
      </div>
      <SidebarsMenu enabledSidebarIds={enabledSidebarIds} />
    </PageWrapper>
  );
};

const SidebarsPageWrapper = connect(mapStateToProps)(PureSidebarsPageWrapper);

export { PureSidebarsPageWrapper };
export default SidebarsPageWrapper;
