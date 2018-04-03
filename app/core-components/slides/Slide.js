// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import type { DenormalizedRootContentItem } from 'modules/content-items';

import ContentItemHtmlDisplay from './content-item-html-display';

type PassedProps = {
  // A denormalized ROOT item containing the content to be displayed on this slide.
  contentItemTreeRootItem: DenormalizedRootContentItem,
  // The heading level of the top level headings on the slide. Defaults to 1.
  rootHeadingLevel: number,
};

type Props = TranslatorProps & PassedProps;

const PureSlide = (props: Props): React.Node => {
  const { contentItemTreeRootItem, rootHeadingLevel } = props;

  return (
    <div className="ows_slide">
      <div className="ows_slide__size">
        <div className="ows_slide__content">
          <ContentItemHtmlDisplay
            contentItem={contentItemTreeRootItem}
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
