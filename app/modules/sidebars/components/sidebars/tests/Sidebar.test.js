// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebar } from '../Sidebar';

describe(`Sidebar`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = {
      id: 'abcdefghij',
      userId: '1234567890',
      title: 'Lorem ipsum',
      description: '',
      rootContentItemId: 'abcdefghij',
    };

    const enzymeWrapper = shallow(
      <PureSidebar
        topicId="abcdefghij"
        topic={dummyTopic}
        sidebarName="SidebarName/SLIDE"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
