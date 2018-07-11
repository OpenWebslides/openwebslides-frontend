// @flow

import _ from 'lodash';
import * as React from 'react';
import type { Identifier } from 'types/model';

import * as model from '../../../model';
import ContentItemEditableDisplay, { passThroughProps } from '..';

const { RootContentItem } = model;

type PassedProps = {
  contentItem: RootContentItem,
};

type Props = PassedProps;

const PureRoot = (props: Props): React.Node => {
  const { contentItem } = props;

  return (
    <div data-test-id="content-item-editable-display-root">
      {contentItem.childItemIds.map((childItemId: Identifier): React.Node => {
        return (
          <ContentItemEditableDisplay
            {..._.pick(props, passThroughProps)}
            key={childItemId}
            contentItemId={childItemId}
          />
        );
      })}
    </div>
  );
};

const Root = PureRoot;

export { PureRoot };
export default Root;
