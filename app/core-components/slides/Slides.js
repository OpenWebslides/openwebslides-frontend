// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import contentItems from 'modules/contentItems';
import split from 'lib/content-item-split';

import Slide from './Slide';

type PassedProps = {|
  // A denormalized ROOT item containing the content to be displayed on this slide.
  contentItemTreeRootItem: contentItems.model.DenormalizedRootContentItem,
|};

type Props = {|
  ...TranslatorProps,
  ...PassedProps,
|};

const PureSlides = (props: Props): React.Node => {
  const { contentItemTreeRootItem } = props;
  const contentItemsArray = split(contentItemTreeRootItem);

  return (
    <div className="ows_slides_container">
      {
        contentItemsArray.map((contentItem) => (
          <Slide key={contentItem.id} contentItem={contentItem} />
        ))
      }
    </div>
  );
};

const Slides = translate()(PureSlides);

export { PureSlides };
export default Slides;
