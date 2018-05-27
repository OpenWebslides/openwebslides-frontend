// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';
import type { SlideStyling } from 'modules/slide-styling/model';

import contentItems from 'modules/content-items';

import { PureSlides } from '../Slides';

const { contentItemTypes } = contentItems.model;

describe(`Slides`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItemTreeRoot = {
      id: 'abcdefghij',
      type: contentItemTypes.ROOT,
      isEditing: false,
      childItemIds: [],
      childItems: [],
    };

    const dummySlideStyling: $Exact<SlideStyling> = {
      id: 'azd15dsqz1',
      userId: 'adkqmq5ds5',
      rules: {
        [contentItemTypes.PARAGRAPH]: {
          color: '#000000',
          font: 'Verdana',
        },
        [contentItemTypes.HEADING]: {
          color: '#000000',
          font: 'Verdana',
        },
      },
    };

    const enzymeWrapper = shallow(
      <PureSlides
        {...dummyTranslatorProps}
        contentItemTreeRootItem={dummyContentItemTreeRoot}
        slideStyling={dummySlideStyling}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
