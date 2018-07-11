// @flow
/**
 * Takes a denormalized contentItem and renders it as HTML, using the appropriate display component
 * based on the contentItem's type. If the contentItem is subable, the sub items are automatically
 * rendered as HTML as well, and passed to the display omponent as its children.
 */

import * as React from 'react';

import * as m from '../../model';
import typesToComponentsMap from './helpers/typesToComponentsMap';

type PassedProps = {
  // The contentItem to be displayed.
  contentItem: m.DenormalizedContentItem,
  // Used to automatically calculate the HTML heading level of nested HEADING contentItems.
  headingLevel: number,
};

type Props = PassedProps;

const SubItemsHtmlDisplay = (props: Props): React.Node => {
  const { contentItem, headingLevel } = props;

  if (contentItem.subItems == null) {
    return null;
  }
  else if (contentItem.subItems.length === 0) {
    return null;
  }
  else {
    const subItemsHeadingLevel = (contentItem.type === m.contentItemTypes.HEADING)
      ? headingLevel + 1
      : headingLevel;

    return (
      <div className="ows_container__sub-items">
        { /* $FlowFixMe Technically, flow has all the information needed; probably a bug */ }
        {contentItem.subItems.map(
          (subItem: m.DenormalizedContentItem): React.Node => (
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
};

const PureHtmlDisplay = (props: Props): React.Node => {
  const { contentItem, headingLevel } = props;
  const DisplayComponent = typesToComponentsMap[contentItem.type];

  return (
    <DisplayComponent
      // $FlowFixMe Flow doesn't currently parse the mapping to see that the types are correct.
      contentItem={contentItem}
      headingLevel={headingLevel}
    >
      <SubItemsHtmlDisplay {...props} />
    </DisplayComponent>
  );
};

const HtmlDisplay = PureHtmlDisplay;

export { PureHtmlDisplay };
export default HtmlDisplay;
