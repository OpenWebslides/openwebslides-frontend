// @flow

import * as React from 'react';

import type { DenormalizedContentItem, DenormalizedRootContentItem } from 'modules/content-items';

import ContentItemDisplay from '..';

type PassedProps = {
  contentItem: DenormalizedRootContentItem,
  headingLevel: number,
};

type Props = PassedProps;

const PureRoot = (props: Props): React.Node => {
  const { contentItem, headingLevel } = props;

  return contentItem.childItems.map((childItem: DenormalizedContentItem): React.Node => {
    return (
      <ContentItemDisplay
        key={childItem.id}
        contentItem={childItem}
        headingLevel={headingLevel}
      />
    );
  });
};

const Root = PureRoot;

export { PureRoot };
export default Root;
