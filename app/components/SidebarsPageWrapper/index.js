// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { type State } from 'types/state';
import FlashMessages from 'components/FlashMessages';
import platform from 'modules/platform';

import PageWrapper from '../PageWrapper';

const { Sidebars, SidebarsMenu } = platform.components;

type PassedProps = {|
  children: React.Node,
  topicId: string,
|};

type StateProps = {|
  activeSidebarsCount: number,
|};

type Props = {| ...PassedProps, ...StateProps |};

const mapStateToProps = (state: State): StateProps => {
  const activeSidebarIds = platform.selectors.getSettingByKey(state, { key: 'activeSidebarIds' });

  return {
    activeSidebarsCount: activeSidebarIds.length,
  };
};

const PureSidebarsPageWrapper = (props: Props): React.Node => {
  const { children, topicId, activeSidebarsCount } = props;

  const sidebarsWidthPercentage = activeSidebarsCount * 20;

  return (
    <PageWrapper className="page--sidebars">
      <div className="page__grid">
        <div
          className="page__grid-item"
          style={{ width: `${100 - sidebarsWidthPercentage}%` }}
        >
          <div className="page__main-content">
            <FlashMessages />
            {children}
          </div>
        </div>
        {(activeSidebarsCount > 0) && (
          <div
            className="page__grid-item"
            style={{ width: `${sidebarsWidthPercentage}%` }}
          >
            <Sidebars topicId={topicId} />
          </div>
        )}
      </div>
      <SidebarsMenu />
    </PageWrapper>
  );
};

const SidebarsPageWrapper = connect(mapStateToProps)(PureSidebarsPageWrapper);

export { PureSidebarsPageWrapper };
export default SidebarsPageWrapper;
