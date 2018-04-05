// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import * as contentItems from 'modules/content-items';

import { PureSlide } from '../Slide';

describe(`Slide`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItemTreeRoot = {
      id: 'abcdefghij',
      type: contentItems.contentItemTypes.ROOT,
      childItemIds: [],
      childItems: [],
    };

    const enzymeWrapper = shallow(
      <PureSlide
        {...dummyTranslatorProps}
        contentItemTreeRootItem={dummyContentItemTreeRoot}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
