// @flow

import * as React from 'react';

import * as model from '../../../model';
import HtmlDisplay from '..';

const { DenormalizedContentItem, DenormalizedRootContentItem } = model;

type PassedProps = {
  contentItem: DenormalizedRootContentItem,
  headingLevel: number,
};

type Props = PassedProps;

const PureRoot = (props: Props): React.Node => {
  const { contentItem, headingLevel } = props;

  return contentItem.childItems.map((childItem: DenormalizedContentItem): React.Node => {
    return (
      <HtmlDisplay
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
