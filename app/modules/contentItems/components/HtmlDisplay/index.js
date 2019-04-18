// @flow

/**
 * Takes a denormalized contentItem and renders it as HTML, using the appropriate display component
 * based on the contentItem's type. If the contentItem is subable, the sub items are automatically
 * rendered as HTML as well, and passed to the display omponent as its children.
 */

import * as React from 'react';

import * as m from '../../model';

import typesToComponentsMap from './typesToComponentsMap';

type PassedProps = {|
  // The contentItem to be displayed.
  contentItem: ?m.DenormalizedContentItem,
  // Used to automatically calculate the HTML heading level of nested HEADING contentItems.
  headingLevel: number,
|};

type Props = {| ...PassedProps |};

class PureHtmlDisplay extends React.Component<Props> {
  renderSubItemsHtmlDisplay = (contentItem: m.DenormalizedContentItem): React.Node => {
    const { headingLevel } = this.props;

    if (
      contentItem.subItems == null
      || contentItem.type === m.contentItemTypes.ROOT
      || contentItem.subItems.length === 0) {
      return null;
    }
    else {
      const subItemsHeadingLevel = (contentItem.type === m.contentItemTypes.HEADING)
        ? headingLevel + 1
        : headingLevel;

      return (
        <div
          className="ows_container__sub-items"
          data-test-id="content-item-html-display__sub-items"
        >
          {contentItem.subItems.map((subItem: m.DenormalizedContentItem): React.Node => (
            <HtmlDisplay
              key={subItem.id}
              contentItem={subItem}
              headingLevel={subItemsHeadingLevel}
            />
          ))}
        </div>
      );
    }
  };

  renderHtmlDisplay = (contentItem: m.DenormalizedContentItem): React.Node => {
    const { headingLevel } = this.props;
    const DisplayComponent = typesToComponentsMap[contentItem.type];

    return (
      // $FlowFixMe Flow doesn't currently parse the mapping to see that the types are correct.
      <DisplayComponent
        contentItem={contentItem}
        headingLevel={headingLevel}
      >
        {this.renderSubItemsHtmlDisplay(contentItem)}
      </DisplayComponent>
    );
  };

  render(): React.Node {
    const { contentItem } = this.props;
    return (contentItem == null) ? null : this.renderHtmlDisplay(contentItem);
  }
}

const HtmlDisplay = PureHtmlDisplay;

export { PureHtmlDisplay };
export default HtmlDisplay;
