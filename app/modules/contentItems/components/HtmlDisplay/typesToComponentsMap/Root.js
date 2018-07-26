// @flow

import * as React from 'react';

import * as m from '../../../model';

import HtmlDisplay from '..';

type PassedProps = {|
  contentItem: m.DenormalizedRootContentItem,
  headingLevel: number,
|};

type Props = {| ...PassedProps |};

const PureRoot = (props: Props): React.Node => {
  const { contentItem, headingLevel } = props;

  return contentItem.childItems.map((childItem: m.DenormalizedContentItem): React.Node => {
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
