// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import type { DenormalizedRootContentItem } from './model';

type PassedProps = {
  contentItemTreeRootItem: DenormalizedRootContentItem,
};

type Props = TranslatorProps & PassedProps;

const PureSlide = (props: Props): React.Node => {
  const { contentItemTreeRootItem } = props;

  return (
    <div>
      {JSON.stringify(contentItemTreeRootItem, null, 2)}
    </div>
  );
};

const Slide = translate()(PureSlide);

export { PureSlide };
export default Slide;
