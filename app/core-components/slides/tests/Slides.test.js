// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';
import contentItems from 'modules/contentItems';

import { PureSlides } from '../Slides';

const { contentItemTypes } = contentItems.model;

describe(`Slides`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItemTreeRoot = {
      id: 'abcdefghij',
      type: contentItemTypes.ROOT,
      isEditing: false,
      childItemIds: ['hd83riji8c'],
      childItems: [{
        id: 'hd83riji8c',
        type: contentItemTypes.HEADING,
        isEditing: false,
        text: 'Heading',
        metadata: {
          tags: [],
          visibilityOverrides: {},
        },
        subItems: [],
      }],
    };

    const enzymeWrapper = shallow(
      <PureSlides
        {...dummyTranslatorProps}
        contentItemTreeRootItem={dummyContentItemTreeRoot}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
