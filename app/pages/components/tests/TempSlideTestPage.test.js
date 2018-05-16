// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { contentItemTypes } from 'modules/content-items';
import type { DenormalizedRootContentItem } from 'modules/content-items';
import type { SlideStyling } from 'modules/slide-styling/model';

import { PureTempSlideTestPage } from '../TempSlideTestPage';

describe(`TempSlideTestPage`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyDenormalizedContentItem: $Exact<DenormalizedRootContentItem> = {
      id: 'abcdefghij',
      type: contentItemTypes.ROOT,
      childItems: [],
    };

    const dummySlideStyling: $Exact<SlideStyling> = {
      id: 'azd15dsqz1',
      userId: 'adkqmq5ds5',
      rules: {
        [contentItemTypes.PARAGRAPH]: {
          color: '#000000',
        },
        [contentItemTypes.HEADING]: {
          color: '#000000',
        },
      },
    };
    const enzymeWrapper = shallow(
      <PureTempSlideTestPage
        {...dummyTranslatorProps}
        contentItemTreeRootItem={dummyDenormalizedContentItem}
        slideStylingItem={dummySlideStyling}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
