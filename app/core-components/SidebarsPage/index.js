// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { type State } from 'types/state';
import { type Identifier } from 'types/model';
import platform from 'modules/platform';

import Page from '../Page';

const { Sidebars, SidebarsMenu } = platform.components;

type PassedProps = {|
  children: React.Node,
  topicId: Identifier,
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

const PureSidebarsPage = (props: Props): React.Node => {
  const { children, topicId, activeSidebarsCount } = props;

  const sidebarsWidthPercentage = activeSidebarsCount * 20;

  return (
    <Page className="page--sidebars">
      <div className="page__grid">
        <div
          className="page__grid-item"
          style={{ width: `${100 - sidebarsWidthPercentage}%` }}
        >
          <div className="page__main-content">
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
    </Page>
  );
};

const SidebarsPage = connect(mapStateToProps)(PureSidebarsPage);

export { PureSidebarsPage };
export default SidebarsPage;
