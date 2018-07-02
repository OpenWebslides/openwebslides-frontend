// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import * as contentItems from 'modules/contentItems';

import { PureSlides } from '../Slides';

describe(`Slides`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItemTreeRoot = {
      id: 'abcdefghij',
      type: contentItems.contentItemTypes.ROOT,
      isEditing: false,
      childItemIds: ['hd83riji8c'],
      childItems: [{
        id: 'hd83riji8c',
        type: contentItems.contentItemTypes.HEADING,
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
