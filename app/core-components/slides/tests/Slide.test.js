// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import * as contentItems from 'modules/content-items';
import type { SlideStyling } from 'modules/slide-styling/model';

import { PureSlide } from '../Slide';
import { contentItemTypes } from '../../../modules/content-items/model';

describe(`Slide`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItemTreeRoot = {
      id: 'abcdefghij',
      type: contentItems.contentItemTypes.ROOT,
      childItemIds: [],
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
      <PureSlide
        {...dummyTranslatorProps}
        contentItemTreeRootItem={dummyContentItemTreeRoot}
        slideStyling={dummySlideStyling}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
