// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';

import contentItems from 'modules/content-items';
import type { SlideStyling } from 'modules/slide-styling/model';
import type { DenormalizedContentItem } from 'modules/content-items';

type PassedProps = {
  // A denormalized content item containing the content to be displayed on this slide.
  contentItem: DenormalizedContentItem,
  // The heading level of the top level headings on the slide. Defaults to 1.
  rootHeadingLevel: number,

  slideStyling: SlideStyling,
};

type Props = CustomTranslatorProps & PassedProps;

const ContentItemHtmlDisplay = contentItems.components.HtmlDisplay;

const PureSlide = (props: Props): React.Node => {
  const { rootHeadingLevel, slideStyling, contentItem } = props;
  return (
    <div className="ows_slide">
      <div className="ows_slide__size">
        <div className="ows_slide__content">
          <ContentItemHtmlDisplay
            contentItem={contentItem}
            headingLevel={rootHeadingLevel}
            slideStyling={slideStyling}
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
