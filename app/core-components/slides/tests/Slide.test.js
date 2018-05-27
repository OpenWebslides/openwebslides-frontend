// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import type { SlideStyling } from 'modules/slide-styling/model';
import contentItems from 'modules/content-items';

import { PureSlide } from '../Slide';

const { contentItemTypes } = contentItems.model;

describe(`Slide`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItem = {
      id: 'abcdefghij',
      type: contentItemTypes.HEADING,
      isEditing: false,
      text: 'Heading',
      metadata: {
        tags: [],
        visibilityOverrides: {},
      },
      subItems: [],
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
      <PureSlide
        {...dummyTranslatorProps}
        slideStyling={dummySlideStyling}
        contentItem={dummyContentItem}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
