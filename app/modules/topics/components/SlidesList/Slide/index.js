// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import contentItems from 'modules/contentItems';

type PassedProps = {|
  // A denormalized ROOT content item containing the content to be displayed on this slide.
  contentItem: contentItems.model.DenormalizedRootContentItem,
  // The heading level of the top level headings on the slide. Defaults to 1.
  rootHeadingLevel: number,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const ContentItemHtmlDisplay = contentItems.components.HtmlDisplay;

const PureSlide = (props: Props): React.Node => {
  const { contentItem, rootHeadingLevel } = props;

  return (
    <div className="ows_slide">
      <div className="ows_slide__size">
        <div className="ows_slide__content">
          <ContentItemHtmlDisplay
            contentItem={contentItem}
            headingLevel={rootHeadingLevel}
          />
        </div>
      </div>
    </div>
  );
};

PureSlide.defaultProps = {
  rootHeadingLevel: 1,
};

const Slide = translate()(PureSlide);

export { PureSlide };
export default Slide;
