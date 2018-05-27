// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import type { SlideStyling } from 'modules/slide-styling/model';

import type {
  DenormalizedRootContentItem,
  DenormalizedContentItem,
} from 'modules/content-items';

import split from 'lib/content-item-split';

import Slide from './Slide';

type PassedProps = {
  // A denormalized ROOT item containing the content to be displayed on this slide.
  contentItemTreeRootItem: DenormalizedRootContentItem,

  slideStyling: SlideStyling,
};

type Props = CustomTranslatorProps & PassedProps;

const PureSlides = (props: Props): React.Node => {
  const { contentItemTreeRootItem, slideStyling } = props;

  const contentItems: Array<DenormalizedContentItem> = split(contentItemTreeRootItem);

  return (
    <div className="ows_slides_container">
      {
        contentItems.map((contentItem) => (
          <Slide key={contentItem.id} contentItem={contentItem} slideStyling={slideStyling} />
        ))
      }
    </div>
  );
};

const Slides = translate()(PureSlides);

export { PureSlides };
export default Slides;
