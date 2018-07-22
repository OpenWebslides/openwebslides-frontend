// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import { PureSlides } from '../Slides';

describe(`Slides`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyContentItemTreeRoot = { ...dummyData.rootContentItem, childItems: [] };

    const enzymeWrapper = shallow(
      <PureSlides
        {...dummyTranslatorProps}
        topicId="dummyTopicId"
        contentItemTreeRootItem={dummyContentItemTreeRoot}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
