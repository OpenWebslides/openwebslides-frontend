// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSidebarWrapper } from '../SidebarWrapper';

describe(`SidebarWrapper`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyToggle = jest.fn();
    const enzymeWrapper = shallow(
      <PureSidebarWrapper
        topicId="abcdefghij"
        sidebars={[]}
        toggle={dummyToggle}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
