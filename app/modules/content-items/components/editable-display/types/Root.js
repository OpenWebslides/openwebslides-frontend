// @flow

import _ from 'lodash';
import * as React from 'react';

import type { Identifier } from 'types/model';
import type { RootContentItem } from 'modules/content-items';

import ContentItemEditableDisplay, { passThroughProps } from '..';

type PassedProps = {
  contentItem: RootContentItem,
};

type Props = PassedProps;

const PureRoot = (props: Props): React.Node => {
  const { contentItem } = props;

  return contentItem.childItemIds.map((childItemId: Identifier): React.Node => {
    return (
      <ContentItemEditableDisplay
        {..._.pick(props, passThroughProps)}
        key={childItemId}
        contentItemId={childItemId}
      />
    );
  });
};

const Root = PureRoot;

export { PureRoot };
export default Root;
