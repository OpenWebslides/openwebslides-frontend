// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import * as contentItems from 'modules/content-items';

import { PureSlides } from '../Slides';

describe(`Slides`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItemTreeRoot = {
      id: 'abcdefghij',
      type: contentItems.contentItemTypes.ROOT,
      isEditing: false,
      childItemIds: [],
      childItems: [],
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
