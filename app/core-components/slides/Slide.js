// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

// #TODO throws errror when trying to convert flow types to proptypes
// import type { DenormalizedRootContentItem } from './model';

import * as contentItems from 'modules/content-items';

type PassedProps = {
  contentItemTreeRootItem: contentItems.RootContentItem,
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
