// @flow
/**
 * Takes a denormalized contentItem and renders it as HTML, using the appropriate display component
 * based on the contentItem's type. If the contentItem is subable, the sub items are automatically
 * rendered as HTML as well, and passed to the display omponent as its children.
 */

import _ from 'lodash';
import * as React from 'react';

import { contentItemTypes, subableContentItemTypes } from '../../model';
import type {
  DenormalizedContentItem,
  DenormalizedSubableContentItem,
} from '../../model';

import Root from './types/Root';
import Heading from './types/Heading';
import Paragraph from './types/Paragraph';

const DummyDisplayComponent = (): React.Node => (
  <p>Not implemented yet.</p>
);

const contentItemTypesToDisplayComponentMap = {
  [contentItemTypes.ROOT]: Root,
  [contentItemTypes.HEADING]: Heading,
  [contentItemTypes.PARAGRAPH]: Paragraph,
  [contentItemTypes.LIST]: DummyDisplayComponent,
  [contentItemTypes.LIST_ITEM]: DummyDisplayComponent,
  [contentItemTypes.BLOCKQUOTE]: DummyDisplayComponent,
  [contentItemTypes.CODE]: DummyDisplayComponent,
  [contentItemTypes.IMAGE]: DummyDisplayComponent,
  [contentItemTypes.VIDEO]: DummyDisplayComponent,
  [contentItemTypes.AUDIO]: DummyDisplayComponent,
  [contentItemTypes.IFRAME]: DummyDisplayComponent,
  [contentItemTypes.SLIDE_BREAK]: DummyDisplayComponent,
  [contentItemTypes.COURSE_BREAK]: DummyDisplayComponent,
};

type PassedProps = {
  // The contentItem to be displayed.
  contentItem: DenormalizedContentItem,
  // Used to automatically calculate the HTML heading level of nested HEADING contentItems.
  headingLevel: number,
  // Used to keep container class names consistent between components. Defaults to 'ows_container'.
  containerClassName: string,
  // Used to make sub-items selectable in tests. Defaults to '__sub-items'.
  subItemsClassNameSuffix: string,
};

type Props = PassedProps;

const passThroughProps = [
  'headingLevel',
  'containerClassName',
  'subItemsClassNameSuffix',
];

const SubItemsHtmlDisplay = (props: Props): React.Node => {
  const { contentItem, headingLevel, containerClassName, subItemsClassNameSuffix } = props;

  if (!_.includes(subableContentItemTypes, contentItem.type)) {
    return null;
  }
  else {
    // eslint-disable-next-line flowtype/no-weak-types
    const subableContentItem = (((contentItem: any): DenormalizedSubableContentItem));

    if (subableContentItem.subItems.length === 0) {
      return null;
    }
    else {
      const subItemsHeadingLevel = (contentItem.type === contentItemTypes.HEADING)
        ? headingLevel + 1
        : headingLevel;

      return (
        <div className={`${containerClassName}${subItemsClassNameSuffix}`}>
          {subableContentItem.subItems.map(
            (subItem: DenormalizedContentItem): React.Node => (
              <HtmlDisplay
                {..._.pick(props, passThroughProps)}
                key={subItem.id}
                contentItem={subItem}
                headingLevel={subItemsHeadingLevel}
              />
            ),
          )}
        </div>
      );
    }
  }
};

const PureHtmlDisplay = (props: Props): React.Node => {
  const { contentItem } = props;
  const DisplayComponent = contentItemTypesToDisplayComponentMap[contentItem.type];

  return (
    <DisplayComponent
      {..._.pick(props, passThroughProps)}
      // eslint-disable-next-line flowtype/no-weak-types
      contentItem={(contentItem: any)}
    >
      <SubItemsHtmlDisplay {...props} />
    </DisplayComponent>
  );
};

PureHtmlDisplay.defaultProps = {
  containerClassName: 'ows_container',
  subItemsClassNameSuffix: '__sub-items',
};

const HtmlDisplay = PureHtmlDisplay;

export { PureHtmlDisplay, passThroughProps };
export default HtmlDisplay;
