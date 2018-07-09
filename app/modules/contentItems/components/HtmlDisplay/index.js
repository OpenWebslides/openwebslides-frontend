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
};

type Props = PassedProps;

const SubItemsHtmlDisplay = (props: Props): React.Node => {
  const { contentItem, headingLevel } = props;

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
        <div className="ows_container__sub-items">
          {subableContentItem.subItems.map(
            (subItem: DenormalizedContentItem): React.Node => (
              <HtmlDisplay
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
  const { contentItem, headingLevel } = props;
  const DisplayComponent = contentItemTypesToDisplayComponentMap[contentItem.type];

  return (
    <DisplayComponent
      // eslint-disable-next-line flowtype/no-weak-types
      contentItem={(contentItem: any)}
      headingLevel={headingLevel}
    >
      <SubItemsHtmlDisplay {...props} />
    </DisplayComponent>
  );
};

const HtmlDisplay = PureHtmlDisplay;

export { PureHtmlDisplay, DummyDisplayComponent };
export default HtmlDisplay;
