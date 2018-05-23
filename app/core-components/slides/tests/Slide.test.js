// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import contentItems from 'modules/content-items';

import { PureSlide } from '../Slide';

const { contentItemTypes } = contentItems.model;

describe(`Slide`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItem = {
      id: 'abcdefghij',
      type: contentItemTypes.HEADING,
      text: 'Heading',
      metadata: {
        tags: [],
        visibilityOverrides: {},
      },
      subItems: [],
    };

    const enzymeWrapper = shallow(
      <PureSlide
        {...dummyTranslatorProps}
        contentItem={dummyContentItem}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
