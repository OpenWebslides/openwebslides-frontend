// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebar } from '../Sidebar';
import { sidebarNames } from '../../../model';

describe(`Sidebar`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = {
      id: 'abcdefghij',
      userId: '1234567890',
      title: 'Lorem ipsum',
      description: '',
      rootContentItemId: 'abcdefghij',
    };
    const dummySidebar = sidebarNames.SLIDE;

    const enzymeWrapper = shallow(
      <PureSidebar
        topicId="abcdefghij"
        topic={dummyTopic}
        sidebarName={dummySidebar}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
