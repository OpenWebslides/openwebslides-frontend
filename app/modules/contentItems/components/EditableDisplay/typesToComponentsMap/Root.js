// @flow

import _ from 'lodash';
import * as React from 'react';

import * as m from '../../../model';

import ContentItemEditableDisplay, { passThroughProps } from '..';

type PassedProps = {|
  contentItem: m.RootContentItem,
|};

type Props = {| ...PassedProps |};

const PureRoot = (props: Props): React.Node => {
  const { contentItem } = props;

  return (
    <div data-test-id="content-item-editable-display-root">
      {contentItem.subItemIds.map((subItemId: string): React.Node => {
        return (
          <ContentItemEditableDisplay
            {..._.pick(props, passThroughProps)}
            key={subItemId}
            contentItemId={subItemId}
          />
        );
      })}
    </div>
  );
};

const Root = PureRoot;

export { PureRoot };
export default Root;
