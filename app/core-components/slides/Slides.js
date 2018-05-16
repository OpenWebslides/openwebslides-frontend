// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';

import type { DenormalizedRootContentItem } from 'modules/content-items';

import Slide from './Slide';

type PassedProps = {
  // A denormalized ROOT item containing the content to be displayed on this slide.
  contentItemTreeRootItem: DenormalizedRootContentItem,
};

type Props = CustomTranslatorProps & PassedProps;

const PureSlides = (props: Props): React.Node => {
  const { contentItemTreeRootItem } = props;

  return (
    <div className="ows_slides">
      <Slide contentItemTreeRootItem={contentItemTreeRootItem} />
    </div>
  );
};

const Slides = translate()(PureSlides);

export { PureSlides };
export default Slides;
