// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSlideSidebar } from '../SlideSidebar';

describe(`SlideSidebar`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = {
      id: 'abcdefghij',
      userId: '1234567890',
      title: 'Lorem ipsum',
      description: '',
      rootContentItemId: 'abcdefghij',
    };
    const dummyContentItemTreeRootItem = {
      childItemIds: [],
      childItems: [],
      id: 'qyrgv0bcd6',
      type: 'contentItemTypes/ROOT',
    };

    const enzymeWrapper = shallow(
      <PureSlideSidebar
        contentItemTreeRootItem={dummyContentItemTreeRootItem}
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
