// @flow

import _ from 'lodash';
import * as React from 'react';

import type { SlideStyling } from '../../../../slide-styling/model';
import type { DenormalizedContentItem, DenormalizedRootContentItem } from '../../../model';

import HtmlDisplay, { passThroughProps } from '..';

type PassedProps = {
  contentItem: DenormalizedRootContentItem,
  headingLevel: number,
  slideStyling: SlideStyling,
};

type Props = PassedProps;

const PureRoot = (props: Props): React.Node => {
  const { contentItem, slideStyling } = props;

  return contentItem.childItems.map((childItem: DenormalizedContentItem): React.Node => {
    return (
      <HtmlDisplay
        {..._.pick(props, passThroughProps)}
        key={childItem.id}
        contentItem={childItem}
        slideStyling={slideStyling}
      />
    );
  });
};

const Root = PureRoot;

export { PureRoot };
export default Root;
