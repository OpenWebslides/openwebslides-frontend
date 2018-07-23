// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyContentItemData as dummyData, dummyProviderProps } from 'lib/testResources';

import { PureSlides } from '.';

describe(`Slides`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItemTreeRoot = { ...dummyData.rootContentItem, childItems: [] };

    const enzymeWrapper = shallow(
      <PureSlides
        {...dummyProviderProps.translatorProps}
        topicId="dummyTopicId"
        contentItemTreeRootItem={dummyContentItemTreeRoot}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
