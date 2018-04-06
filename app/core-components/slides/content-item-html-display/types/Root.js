// @flow

import _ from 'lodash';
import * as React from 'react';

import type { DenormalizedContentItem, DenormalizedRootContentItem } from 'modules/content-items';

import ContentItemHtmlDisplay, { passThroughProps } from '..';

type PassedProps = {
  contentItem: DenormalizedRootContentItem,
  headingLevel: number,
};

type Props = PassedProps;

const PureRoot = (props: Props): React.Node => {
  const { contentItem } = props;

  return contentItem.childItems.map((childItem: DenormalizedContentItem): React.Node => {
    return (
      <ContentItemHtmlDisplay
        {..._.pick(props, passThroughProps)}
        key={childItem.id}
        contentItem={childItem}
      />
    );
  });
};

const Root = PureRoot;

export { PureRoot };
export default Root;
